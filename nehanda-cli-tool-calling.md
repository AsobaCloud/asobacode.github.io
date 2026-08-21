---
title: "Tool Calling"
layout: default
parent: "Nehanda CLI"
nav_order: 11
---

# Tool Calling

Nehanda CLI supports two tool calling paths: **native** (provider handles tool selection and returns structured `tool_calls`) and **rescue** (tool schemas are injected into the system prompt, and the engine parses tool calls from model text). The rescue path exists to work around a specific vLLM limitation.

## The Problem

The Nehanda vLLM deployment runs with two flags:

- `--tool-call-parser qwen3_xml` — tells vLLM to intercept Qwen-style XML tool calls
- `--enable-auto-tool-choice` — enables automatic tool selection

However, the `nehandaMlProxy` Lambda function **strips the `tools` and `tool_choice` arrays from requests** before forwarding to vLLM. This is necessary to work around a Qwen3 chat template bug where the presence of a `tools` array causes system message ordering errors.

The consequence: the model never receives native tool definitions, so it can't use the standard OpenAI tool calling protocol. The engine needs a way to get tool calls out of the model anyway.

## The Rescue Path

```
1. System prompt injection
   Tool schemas injected as [TOOL_CALL]...[/TOOL_CALL] blocks
   into the system prompt, with example invocations

2. Late directive injection
   A [SYSTEM DIRECTIVE] appended to the final user message
   to defeat token recency bias on reasoning models

3. Model generation
   The model emits tool calls in [TOOL_CALL] format within its response text.
   No native tool_calls are returned by the provider.

4. Local parsing & execution
   parseXmlToolCalls() extracts JSON tool calls from the text.
   executeBuiltinTool() runs them.
   Results are appended to the transcript.
   The loop continues.
```

### Why `[TOOL_CALL]` Not `<tool_call>` XML?

The vLLM `--tool-call-parser qwen3_xml` flag registers `<tool_call>` XML tags as **stop tokens**. When the model emits them in plain text:

1. vLLM terminates generation mid-sentence
2. vLLM's native parser takes over
3. The native parser returns nothing (the plain-text path never populates `message.tool_calls`)
4. The result: truncated responses containing only thinking traces

Switching to `[TOOL_CALL]...[/TOOL_CALL]` delimiters **completely bypasses** vLLM's stop-token interception. The model completes its full generation, and the engine parses the tool calls locally.

## Parser Details

### `parseXmlToolCalls(text, knownToolNames)`

Extracts tool calls from model output. The parser:

1. Finds `[TOOL_CALL]...[/TOOL_CALL]` blocks
2. Extracts JSON from within the delimiters
3. Strips any leaked XML tags (`<arguments>`, `<tool_call>`)
4. Repairs a common shorthand: `{"ToolName", "arguments": {...}}` → `{"name":"ToolName", "arguments": {...}}`
5. Validates tool names against `knownToolNames` (ignores unknown tools)
6. Returns an array of `tool_use` objects

### `parseManualToolCalls(text)`

A fallback parser that looks for JSON tool calls in fenced code blocks:

````
```json
{"tool": "ToolName", "input": {"key": "value"}}
```
````

This is used when `[TOOL_CALL]` blocks are not found but the model still tries to call tools.

## When Is Rescue Mode Active?

Rescue mode is active when **either** of these is true:

1. The provider is configured with `force_manual_tools: true` in settings
2. The provider is `nehanda` (the Nehanda Cloud endpoint)
3. The provider is `ollama` and native tool support was not detected
4. An Ollama provider returned a "does not support tools" error (triggers automatic fallback)

### Ollama Tool Support Detection

For Ollama providers, the engine proactively checks whether the model supports native tools by calling `/api/show`:

```json
{
  "template": "... .Tools ...",
  "capabilities": ["tools"]
}
```

If the template contains `.Tools` or capabilities include `tools`, native tool calling is used. Otherwise, rescue mode is activated. Results are cached per model to avoid repeated checks.

## Native Tool Calling

When native tool calling is available (Claude, LM Studio with tool support, Ollama with tool support), the engine:

1. Sends the `tools` array in the API request
2. Receives structured `tool_calls` in the response
3. Executes them directly — no text parsing needed

The two paths are transparent to the rest of the engine. Both produce the same `tool_use` objects that flow into the tool execution pipeline.

## `omitToolChoice` Behavior

Some providers (notably Nehanda) require `tool_choice` to be omitted from requests. The `omitToolChoice(provider)` function in `modelConfig.mjs` handles this. When `tool_choice` is omitted, the model relies on the `[SYSTEM DIRECTIVE]` late injection to decide whether to use tools.
