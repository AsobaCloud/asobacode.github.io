---
title: "SDK"
layout: default
nav_order: 1.75
---

# Ona SDK - Release Notes

The Ona SDK provides a streamlined way to integrate Ona Platform capabilities into your existing product stacks and applications. Instead of building custom API integrations from scratch, the SDK offers pre-built, tested, and maintained client libraries that handle authentication, request formatting, error handling, and response parsing. This enables rapid integration, reduces development time, and ensures consistency with Ona Platform's evolving API surface.

Whether you're building dashboards, automation scripts, or enterprise integrations, the SDK abstracts away the complexity of direct API calls and provides a developer-friendly interface that follows best practices for your chosen language ecosystem.

---

## Overview
{: #overview }

This release includes improvements to repository management and documentation structure. The main README has been completely rewritten to better reflect the current SDK architecture and provide clear navigation to JavaScript and Python SDK documentation.

---

## Changes
{: #changes }

### 1. Repository Management
- Added `.gitignore` file to exclude `.github/` folder from version control
- GitHub workflows are now properly ignored by git

### 2. Documentation Updates
- Completely rewrote main `README.md` with modern structure
- Added clear sections for JavaScript and Python SDKs
- Included quick start examples for both SDKs
- Added links to detailed SDK documentation (`javascript/README.md` and `python/README.md`)
- Removed outdated code examples (AsobaUploader/OnaUploader)
- Updated installation instructions for both SDKs
- Added comprehensive service overviews
- Improved navigation with clear section headers
- Added links to examples and API references

---

## Improvements
{: #improvements }

### Better Developer Experience
- Main README now serves as a clear entry point for new users
- Quick start examples help developers get started immediately
- Clear navigation to detailed documentation for each SDK

### Repository Organization
- `.github` folder properly excluded from version control
- Cleaner repository structure

### Documentation Quality
- Removed outdated and incorrect code examples
- Aligned documentation with actual SDK implementation
- Consistent formatting and structure

---

## Breaking Changes
{: #breaking-changes }

None

---

## Migration Guide
{: #migration-guide }

No migration required. This is a documentation and repository management update only.

For developers using the SDKs:
- **JavaScript SDK:** Continue using `@asoba/ona-sdk` as before
- **Python SDK:** Continue using `ona-platform` as before
- Refer to updated main README for quick start examples
- See `javascript/README.md` or `python/README.md` for detailed documentation

---

## Files Changed
{: #files-changed }

**New Files:**
- `.gitignore`

**Modified Files:**
- `README.md` (97% rewrite)

---

## Next Steps
{: #next-steps }

- Continue development on JavaScript and Python SDKs
- Monitor documentation feedback from users
- Consider adding versioning information to README

---

## Support
{: #support }

For questions or issues:
- **Email:** support@asoba.co
- **GitHub Issues:** https://github.com/AsobaCloud/platform/issues
- **Documentation:** https://docs.asoba.co
