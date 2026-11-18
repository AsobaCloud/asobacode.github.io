#!/usr/bin/env python3
"""
Behavioral test for Nehanda CLI Core Architectural Concepts documentation.
Tests:
- File existence and Jekyll frontmatter
- Placement immediately after "Getting Started" in _layouts/default.html
- Inclusion of the 3 required architectural pillars:
  1. System 1 / System 2 cognitive division (Laya vs generative System 2)
  2. Why Jev-Mem (Jevons paradox, multi-relational graph, beam retrieval, pinned invariants)
  3. Theory behind deterministic SDLC (controlling smaller local models, preventing generative drift)
- Navigation integration across _data/navigation.yml, _layouts/default.html, and nehanda-cli.md
- Flesch-Kincaid readability score conforming to ~12th grade reading level (accessible, clear, 10.0 - 13.5)
"""

import os
import re
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOC_PATH = os.path.join(REPO_ROOT, "nehanda-cli-core-concepts.md")
NAV_YML = os.path.join(REPO_ROOT, "_data", "navigation.yml")
LAYOUT_HTML = os.path.join(REPO_ROOT, "_layouts", "default.html")
INDEX_CLI = os.path.join(REPO_ROOT, "nehanda-cli.md")

def count_syllables(word):
    word = word.lower().strip(".:;?!'\"(),[]{}")
    if not word:
        return 0
    if len(word) <= 3:
        return 1
    word = re.sub(r'(?:[^laeiouy]|ed|es|e)$', '', word)
    word = re.sub(r'^y', '', word)
    syllables = len(re.findall(r'[aeiouy]{1,2}', word))
    return max(1, syllables)

def flesch_kincaid_grade_level(text):
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    words = [w.strip() for w in re.split(r'\s+', text) if w.strip() and re.search(r'[a-zA-Z]', w)]
    if not sentences or not words:
        return 0.0
    total_syllables = sum(count_syllables(w) for w in words)
    words_per_sentence = len(words) / len(sentences)
    syllables_per_word = total_syllables / len(words)
    grade = 0.39 * words_per_sentence + 11.8 * syllables_per_word - 15.59
    return grade

def test_file_exists():
    assert os.path.isfile(DOC_PATH), f"Target doc file missing: {DOC_PATH}"
    print("PASS: nehanda-cli-core-concepts.md exists")

def test_frontmatter():
    with open(DOC_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    assert content.startswith("---"), "Frontmatter opening missing"
    parts = content.split("---", 2)
    assert len(parts) >= 3, "Frontmatter not properly delimited with ---"
    fm = parts[1]
    assert 'title: "Core Concepts"' in fm or "title: 'Core Concepts'" in fm, "Frontmatter missing title: 'Core Concepts'"
    assert 'parent: "Nehanda CLI"' in fm or "parent: 'Nehanda CLI'" in fm, "Frontmatter missing parent: 'Nehanda CLI'"
    assert re.search(r'nav_order:\s*(?:1\.5|2)', fm), "Frontmatter missing appropriate nav_order"
    print("PASS: Jekyll frontmatter is valid")

def test_core_sections():
    with open(DOC_PATH, "r", encoding="utf-8") as f:
        body = f.read()

    # Pillar 1: System 1 / System 2
    assert "System 1" in body and "System 2" in body, "Missing System 1 / System 2 discussion"
    assert "Laya" in body, "Missing Laya System-1 reference"
    assert re.search(r'non-autoregressive', body, re.IGNORECASE), "Missing non-autoregressive explanation"
    assert re.search(r'reflex|decision model', body, re.IGNORECASE), "Missing fast reflex/decision model concept"

    # Pillar 2: Why Jev-Mem & Jevons Paradox
    assert re.search(r'Jevons\s+Paradox', body, re.IGNORECASE), "Missing Jevons Paradox explanation"
    assert "Jev-Mem" in body, "Missing Jev-Mem concept"
    assert re.search(r'pinned_context|pinned\s+context|domain\s+invariants', body, re.IGNORECASE), "Missing pinned context explanation"
    assert re.search(r'attention\s+dilution|lost in the middle', body, re.IGNORECASE), "Missing attention dilution / lost in the middle concept"
    assert re.search(r'beam|multi-relational', body, re.IGNORECASE), "Missing beam search or multi-relational graph concept"

    # Pillar 3: Controlling Smaller Local Models & SDLC Theory
    assert re.search(r'deterministic', body, re.IGNORECASE), "Missing deterministic state machine concept"
    assert re.search(r'local model|smaller model', body, re.IGNORECASE), "Missing discussion of smaller/local models"
    assert re.search(r'generative\s+(drift|autonomy|self-policing)', body, re.IGNORECASE) or "mock theater" in body, "Missing generative drift / self-policing failure mode"
    assert re.search(r'tool\s+mask', body, re.IGNORECASE) or "tool mask" in body, "Missing physical tool mask concept"
    assert re.search(r'provenance|evidence', body, re.IGNORECASE), "Missing execution evidence/provenance concept"

    print("PASS: All 3 core architectural pillars are thoroughly documented")

def test_navigation_integration():
    with open(NAV_YML, "r", encoding="utf-8") as f:
        nav = f.read()
    assert "/nehanda-cli-core-concepts" in nav, "_data/navigation.yml missing /nehanda-cli-core-concepts link"

    with open(LAYOUT_HTML, "r", encoding="utf-8") as f:
        layout = f.read()
    assert "nehanda-cli-core-concepts" in layout, "_layouts/default.html missing nehanda-cli-core-concepts link"

    # Specific user requirement: placed after "Getting Started" in default.html menu
    pattern = r'href="\{\{\s*site\.baseurl\s*\}\}/nehanda-cli-getting-started".*?<\/li>\s*<li>\s*<a href="\{\{\s*site\.baseurl\s*\}\}/nehanda-cli-core-concepts">'
    assert re.search(pattern, layout, re.DOTALL), "nehanda-cli-core-concepts is not placed immediately after Getting Started in _layouts/default.html"

    with open(INDEX_CLI, "r", encoding="utf-8") as f:
        cli_index = f.read()
    assert "nehanda-cli-core-concepts" in cli_index, "nehanda-cli.md missing cross-link to core concepts"

    print("PASS: Navigation integration verified across navigation.yml, default.html, and nehanda-cli.md")

def test_readability():
    with open(DOC_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract clean prose paragraphs (ignore code blocks, tables, svg, html)
    text = re.sub(r'---[\s\S]*?---', '', content)
    text = re.sub(r'```[\s\S]*?```', '', text)
    text = re.sub(r'<[\s\S]*?>', '', text)
    text = re.sub(r'\[.*?\]\(.*?\)', '', text)
    text = re.sub(r'\|.*?\|', '', text)
    text = re.sub(r'#+', '', text)

    paragraphs = [p.strip() for p in text.split("\n\n") if len(p.strip()) > 80]
    assert len(paragraphs) >= 5, f"Not enough prose paragraphs found for readability testing ({len(paragraphs)})"

    sample_text = " ".join(paragraphs)
    grade = flesch_kincaid_grade_level(sample_text)
    print(f"Computed Flesch-Kincaid Grade Level: {grade:.2f}")

    # 12th grade target range: 10.0 to 13.5 (accessible high-school senior / freshman college)
    assert 10.0 <= grade <= 13.5, f"Reading level {grade:.2f} is outside the accessible 12th-grade window (10.0 - 13.5)"
    print("PASS: Readability is within the 12th-grade accessibility target")

if __name__ == "__main__":
    tests = [
        test_file_exists,
        test_frontmatter,
        test_core_sections,
        test_navigation_integration,
        test_readability,
    ]
    failed = 0
    for t in tests:
        try:
            t()
        except (AssertionError, OSError) as e:
            print(f"FAIL: {t.__name__} - {e}")
            failed += 1

    if failed:
        sys.exit(1)
    print("ALL TESTS PASSED")
