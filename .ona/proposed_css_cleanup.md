# Proposed CSS Cleanup for GitHub Pages

This document outlines proposed changes to the CSS structure of the GitHub Pages documentation site (`docs/github-pages/`) to improve maintainability, readability, and consistency. These changes are currently deferred but documented for future implementation.

## 1. Rationale for Cleanup

Currently, the site utilizes a mix of external stylesheets and inline `<style>` blocks within Markdown files. This approach leads to:

*   **Poor Maintainability**: Styles are scattered, making updates and debugging difficult.
*   **Reduced Readability**: HTML/Markdown files are cluttered with styling code.
*   **Limited Reusability**: Styles cannot be easily shared across different pages or components.
*   **Inconsistency**: Difficult to enforce a uniform visual design.
*   **Suboptimal Performance**: Inline styles prevent efficient browser caching.

Consolidating CSS into external stylesheets and utilizing Jekyll includes will address these issues, leading to a cleaner, more efficient, and more scalable codebase.

## 2. Proposed Changes

### 2.1. Extract Inline CSS from Markdown Files

**Current State**: Markdown files like `index.md` contain `<style>` blocks with page-specific CSS.

**Proposed Action**: Move all CSS rules from these inline `<style>` blocks into the main external stylesheet: `/home/shingai/sort/terminal/docs/github-pages/assets/css/styles.css`.

**Files to be modified (example)**:
*   `/home/shingai/sort/terminal/docs/github-pages/index.md`
*   `/home/shingai/sort/terminal/docs/github-pages/om-agentic-workflow.md` (already done as part of previous task)

### 2.2. Extract Inline CSS from Layout Files

**Current State**: Layout files like `_layouts/default.html` may contain inline `<style>` blocks.

**Proposed Action**: Move all CSS rules from these inline `<style>` blocks into the main external stylesheet: `/home/shingai/sort/terminal/docs/github-pages/assets/css/styles.css`.

**Files to be modified (example)**:
*   `/home/shingai/sort/terminal/docs/github-pages/_layouts/default.html`

### 2.3. Create Jekyll Includes for Repeated Sections

**Current State**: Sections like "Get Help & Stay Updated" and the Mailchimp signup form are repeated across multiple Markdown files, often with duplicated HTML and inline styles.

**Proposed Action**: Create Jekyll include files for these repeated sections. This involves:

*   **For "Get Help & Stay Updated"**: 
    *   Create `/home/shingai/sort/terminal/docs/github-pages/_includes/get_help_stay_updated.html` and move its HTML content there.
    *   Replace the original HTML in each Markdown file with `{% include get_help_stay_updated.html %}`.
    *   Move associated CSS to `/home/shingai/sort/terminal/docs/github-pages/assets/css/styles.css`.

*   **For Mailchimp Signup Form**: 
    *   Create `/home/shingai/sort/terminal/docs/github-pages/_includes/mailchimp_form.html` and move its HTML content (including the embedded `<style>` and `<script>` tags) there.
    *   Replace the original HTML in each Markdown file with `{% include mailchimp_form.html %}`.
    *   Move associated CSS to `/home/shingai/sort/terminal/docs/github-pages/assets/css/styles.css`.

**Files to be modified (examples)**:
*   `/home/shingai/sort/terminal/docs/github-pages/index.md`
*   `/home/shingai/sort/terminal/docs/github-pages/agent-integration.md`
*   `/home/shingai/sort/terminal/docs/github-pages/business-users.md`
*   `/home/shingai/sort/terminal/docs/github-pages/developers.md`
*   `/home/shingai/sort/terminal/docs/github-pages/legal.md`
*   `/home/shingai/sort/terminal/docs/github-pages/loading-models.md`
*   `/home/shingai/sort/terminal/docs/github-pages/media.md`
*   `/home/shingai/sort/terminal/docs/github-pages/om-agentic-workflow.md`
*   `/home/shingai/sort/terminal/docs/github-pages/om-use-case.md`
*   `/home/shingai/sort/terminal/docs/github-pages/quick-launch.md`
*   `/home/shingai/sort/terminal/docs/github-pages/troubleshooting.md`
*   `/home/shingai/sort/terminal/docs/github-pages/using-cli-commands.md`
*   `/home/shingai/sort/terminal/docs/github-pages/using-commands.md`
*   `/home/shingai/sort/terminal/docs/github-pages/why-ona-terminal.md`

## 3. Benefits of These Changes

*   **Improved Maintainability**: Centralized styles and reusable components are easier to manage.
*   **Enhanced Readability**: Cleaner Markdown and HTML files.
*   **Increased Reusability**: Components can be used across any page.
*   **Better Performance**: External CSS allows for browser caching.
*   **Greater Consistency**: Easier to enforce a uniform visual design.
*   **Future Scalability**: A more organized codebase for future growth.

## 4. Implementation Notes

*   This task involves significant `replace` operations and careful extraction of HTML and CSS.
*   Thorough testing will be required after implementation to ensure no visual regressions.
*   The order of operations for extraction and replacement will be crucial.
