# Content Sensitivity Evaluation Report
**Date:** 2025-01-15  
**Scope:** Publicly accessible pages on code.asoba.co  
**Purpose:** Identify sensitive vs public-safe content

---

## Executive Summary

This evaluation reviews all publicly accessible pages on the site to identify content that should be restricted or removed from public access. The analysis focuses on:

1. **Sensitive Information**: Internal infrastructure details, security vulnerabilities, production resource IDs, deployment specifics
2. **Public-Safe Content**: General documentation, API patterns, usage examples, high-level architecture

---

## Page-by-Page Evaluation

### 1. Home Page (`index.md`)
**Status:** ? **MOSTLY PUBLIC-SAFE** with minor concerns

**Sensitive Content:**
- Discord invite link: `https://discord.gg/nNV5evcr` (public, but could be rate-limited)
- MailChimp subscription form IDs: `u=459ea321d7831d7b9f5fac70f&id=e03a70f492&f_id=000a9ae3f0` (public form IDs, acceptable)

**Public-Safe Content:**
- Product overview and value propositions
- Feature descriptions
- General navigation links

**Recommendation:** ? Keep public - No sensitive infrastructure details

---

### 2. Introduction Page (`introduction.md`)
**Status:** ? **PUBLIC-SAFE**

**Sensitive Content:** None identified

**Public-Safe Content:**
- High-level architecture diagrams (Mermaid)
- System capabilities overview
- General prerequisites
- Case study link to Zenodo

**Recommendation:** ? Keep public - High-level documentation only

---

### 3. Getting Started (`getting-started.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **API Gateway Endpoint URLs** (lines 228-229, 345):
  - `https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health`
  - Reveals actual production API Gateway IDs
- **Test commands with real endpoint URLs**: Direct references to production infrastructure
- **S3 bucket names** (line 154): `sa-api-client-input` - Production bucket name
- **AWS region**: `af-south-1` - Infrastructure location

**Public-Safe Content:**
- General installation instructions
- Configuration examples (with placeholders)
- Troubleshooting guidance

**Recommendation:** ?? **REDACT OR REMOVE**:
1. Replace actual API Gateway URLs with placeholders like `https://api.asoba.co`
2. Replace production S3 bucket names with placeholders
3. Keep AWS region (common knowledge)

---

### 4. Deployment (`deployment.md`)
**Status:** ?? **HIGHLY SENSITIVE**

**Sensitive Content:**
- **Production Lambda Function Names** (lines 29-44):
  - `ingestHistoricalData`, `ingestNowcastData`, `trainForecaster`, etc.
  - Full list of deployed Lambda functions
- **Production API Gateway IDs** (lines 48-54):
  - `yn058ezh38`, `xkg3s0npv0`, `x0o7xd1uq7`, `ul4rjb4twc`, `lxil9blih0`, `rgkv5lgoll`, `baq4wrqcf2`
  - Complete mapping of API Gateway IDs to services
- **Production S3 Bucket Names** (lines 57-70):
  - `sa-api-client-input`, `sa-api-client-output`, `sa-api-client-facing`
  - `api-client-input`, `api-client-output`, `api-policy-repo`
  - `asoba-api-webhost`, `ona-cloudfront-logs`, `utilityapi-static-site`
  - `utilityapi.inboldprint.co`, `stackset-ona-front-end-*`
- **Security Vulnerabilities Disclosure** (lines 90-112):
  - Details about hardcoded credentials in `RAG/ETL/.env` and `RAG/indicators/.env`
  - 950+ wildcard imports vulnerability
  - 14 dependency vulnerabilities
  - **This is EXTREMELY SENSITIVE** - reveals security weaknesses
- **DynamoDB Table Names** (line 74): `api_keys` - Production table name
- **SageMaker Endpoint Details** (lines 77-79): Failed endpoint information
- **Production Infrastructure Status** (lines 17-24): Deployment status, regions, counts

**Public-Safe Content:**
- General deployment concepts
- Docker examples
- Monitoring setup guidance

**Recommendation:** ?? **HIGH PRIORITY - REMOVE OR RESTRICT**:
1. **Remove entire "Current Production State" section** (lines 17-80)
2. **Remove "Critical Security Issues" section** (lines 90-112) - This should be internal only
3. Replace all API Gateway IDs with placeholders
4. Replace all S3 bucket names with placeholders
5. Replace Lambda function names with generic examples
6. Remove DynamoDB table names
7. Remove SageMaker endpoint details

---

### 5. PoC Deployment (`poc-deployment.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **API Gateway IDs** (lines 88-94):
  - `yn058ezh38`, `xkg3s0npv0`, `x0o7xd1uq7`, `ul4rjb4twc`, `lxil9blih0`, `rgkv5lgoll`
- **Production infrastructure details** (lines 73-83): Cost estimates, infrastructure specs
- **Test endpoint URLs** (lines 522, 531, 539, 546, 551, 595): Direct production API references

**Public-Safe Content:**
- General PoC setup concepts
- Docker deployment examples
- Testing methodologies

**Recommendation:** ?? **REDACT**:
1. Replace API Gateway IDs with placeholders
2. Replace production endpoint URLs with generic examples
3. Keep general PoC concepts

---

### 6. API Reference (`api-reference.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **Production API Gateway Endpoints** (lines 54, 62-69):
  - `https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod`
  - `https://x0o7xd1uq7.execute-api.af-south-1.amazonaws.com/prod`
  - `https://xkg3s0npv0.execute-api.af-south-1.amazonaws.com/prod`
  - `https://ul4rjb4twc.execute-api.af-south-1.amazonaws.com/prod`
  - `https://lxil9blih0.execute-api.af-south-1.amazonaws.com/prod`
  - `https://rgkv5lgoll.execute-api.af-south-1.amazonaws.com/prod`
- **Security Vulnerabilities Disclosure** (lines 23-27):
  - Epic #137 details about hardcoded credentials
  - Dependency vulnerabilities count
  - Wildcard imports count
- **Production Service Status** (lines 42-47): Deployment coverage percentages
- **Test endpoint URLs** (lines 487, 490): Direct production API references

**Public-Safe Content:**
- API endpoint patterns
- Request/response formats
- Authentication concepts
- SDK usage examples

**Recommendation:** ?? **REDACT**:
1. Replace all API Gateway URLs with `https://api.asoba.co` or generic placeholders
2. **Remove security vulnerabilities section** (lines 23-27) - Internal only
3. Remove production service status details
4. Replace test URLs with generic examples

---

### 7. Shared Components (`shared-components.md`)
**Status:** ? **PUBLIC-SAFE**

**Sensitive Content:** None identified

**Public-Safe Content:**
- Code examples using shared components
- API patterns and utilities
- General architecture concepts

**Recommendation:** ? Keep public - No sensitive details

---

### 8. CLI Tools (`cli-tools.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **Production API Gateway URL** (line 462):
  - `https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health`

**Public-Safe Content:**
- Command syntax and examples
- Configuration patterns
- General usage guidance

**Recommendation:** ?? **REDACT**:
1. Replace API Gateway URL with `https://api.asoba.co` or placeholder

---

### 9. Integration (`integration.md`)
**Status:** ? **PUBLIC-SAFE**

**Sensitive Content:**
- MailChimp subscription form IDs (same as Home page - acceptable)

**Public-Safe Content:**
- SDK usage examples
- Webhook configuration patterns
- Integration patterns
- Code examples

**Recommendation:** ? Keep public - No sensitive infrastructure details

---

### 10. Development (`development.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **GitHub Repository URLs** (lines 29, 310-327, 410-412, 614):
  - `https://github.com/asobacloud/terminal`
  - May reveal internal repository structure
- **AWS Configuration Examples** (lines 57-58):
  - Shows AWS credential structure (acceptable as examples)
- **Environment Variables** (lines 50-63): Shows configuration structure

**Public-Safe Content:**
- Development setup instructions
- Code structure explanations
- Testing methodologies
- Contributing guidelines

**Recommendation:** ?? **REVIEW**:
1. Verify GitHub repository is intentionally public
2. If repository is private, remove or replace with generic examples
3. Keep general development concepts

---

### 11. Resources (`resources.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **Production API Gateway URL** (line 369):
  - `https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health`
- **GitHub Repository Links** (lines 24-25, 310-318, 410-412):
  - Multiple references to `https://github.com/asobacloud/terminal`
- **Status Page URLs** (lines 361-363): `https://status.asoba.co` (acceptable if public)

**Public-Safe Content:**
- Community resources
- Code examples
- Tutorial links
- Support channels

**Recommendation:** ?? **REDACT**:
1. Replace API Gateway URL with `https://api.asoba.co`
2. Verify GitHub repository visibility
3. Keep community resources

---

### 12. Changelog (`changelog.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **Internal Issue References** (line 17): `Issue #49` - Internal tracking numbers
- **Security Vulnerability Details** (implicit in Epic references)
- **Internal Architecture Details** (lines 18-54): Detailed implementation specifics
- **DynamoDB Table Names** (lines 67-69):
  - `ona-platform-terminal-detections`
  - `ona-platform-terminal-diagnostics`
  - `ona-platform-terminal-issues`
- **S3 Prefix Details** (lines 29, 41): Internal S3 structure
- **Lambda Function Names** (lines 23, 30, 45): Internal service names
- **IAM Role Names** (line 52): `SageMakerTrainingRole`

**Public-Safe Content:**
- High-level feature descriptions
- Version numbers
- General improvements

**Recommendation:** ?? **REDACT OR RESTRICT**:
1. **Remove or redact internal issue numbers** (Issue #49, Epic #137, etc.)
2. **Replace DynamoDB table names** with generic placeholders
3. **Remove detailed S3 structure** - keep high-level only
4. **Replace Lambda function names** with generic service names
5. **Remove IAM role names**
6. Keep high-level changelog entries but remove internal implementation details

---

## Additional Pages (Not in Main Navigation)

### 13. User Guide (`user-guide.md`)
**Status:** ?? **CONTAINS SENSITIVE INFORMATION**

**Sensitive Content:**
- **Production S3 Bucket Names** (line 153): `sa-api-client-input`
- **Production API Gateway URLs** (lines 144, 236, 264, 285, 292): Multiple references
- **Production Infrastructure Details**: Bucket structures, service names

**Recommendation:** ?? **REDACT**: Same as Deployment page

---

### 14. System Admin (`system-admin.md`)
**Status:** ?? **HIGHLY SENSITIVE**

**Sensitive Content:**
- **Production API Gateway Endpoint** (line 18):
  - `https://2m5xvm39ef.execute-api.af-south-1.amazonaws.com/prod`
- **Production S3 Bucket Names** (line 27): `sa-api-client-input/historical/`
- **Internal Service Details**: Complete API endpoint documentation
- **Production Infrastructure**: Service names, endpoints, data structures

**Recommendation:** ?? **RESTRICT ACCESS**: This should be internal-only documentation

---

### 15. FAQ (`faq.md`)
**Status:** ? **PUBLIC-SAFE**

**Sensitive Content:** None identified

**Public-Safe Content:**
- General Q&A
- Pricing information (public-facing)
- ROI examples
- Support information

**Recommendation:** ? Keep public

---

### 16. Legal (`legal.md`)
**Status:** ? **PUBLIC-SAFE**

**Sensitive Content:** None identified

**Public-Safe Content:**
- Terms of Service
- Privacy Policy
- EULA

**Recommendation:** ? Keep public - Required legal documentation

---

## Summary of Sensitive Content Categories

### ?? **CRITICAL - Must Remove/Restrict Immediately**

1. **Security Vulnerabilities Disclosure** (`deployment.md`, `api-reference.md`):
   - Hardcoded credentials locations
   - Vulnerability counts
   - Security weaknesses

2. **Production API Gateway IDs** (Multiple pages):
   - `yn058ezh38`, `xkg3s0npv0`, `x0o7xd1uq7`, `ul4rjb4twc`, `lxil9blih0`, `rgkv5lgoll`, `baq4wrqcf2`, `2m5xvm39ef`
   - Complete infrastructure mapping

3. **Production S3 Bucket Names** (Multiple pages):
   - `sa-api-client-input`, `sa-api-client-output`, `sa-api-client-facing`
   - `api-client-input`, `api-client-output`, `api-policy-repo`
   - `asoba-api-webhost`, `ona-cloudfront-logs`, `utilityapi-static-site`

4. **Production Lambda Function Names** (`deployment.md`):
   - Complete list of deployed functions

5. **Production DynamoDB Table Names**:
   - `api_keys`, `ona-platform-terminal-detections`, etc.

6. **System Admin Documentation** (`system-admin.md`):
   - Complete internal API documentation

### ?? **MODERATE - Should Redact**

1. **Internal Issue Numbers**: `Issue #49`, `Epic #137`, etc.
2. **IAM Role Names**: `SageMakerTrainingRole`
3. **S3 Prefix Structures**: Internal bucket organization
4. **Production Service Status**: Deployment percentages, coverage details

### ? **PUBLIC-SAFE - Keep As Is**

1. High-level architecture diagrams
2. General API patterns
3. Code examples with placeholders
4. SDK usage documentation
5. General deployment concepts
6. FAQ and legal documentation

---

## Recommended Actions

### Immediate Actions (Priority 1)

1. **Remove Security Vulnerabilities Section** from `deployment.md` and `api-reference.md`
2. **Replace all API Gateway IDs** with `https://api.asoba.co` or generic placeholders
3. **Replace all S3 bucket names** with generic placeholders
4. **Restrict `system-admin.md`** access or heavily redact
5. **Remove production Lambda function names** from `deployment.md`

### Short-term Actions (Priority 2)

1. **Redact internal issue numbers** from changelog
2. **Replace DynamoDB table names** with generic examples
3. **Remove detailed S3 structure** references
4. **Replace IAM role names** with generic examples
5. **Review GitHub repository visibility** - ensure intentional public access

### Long-term Actions (Priority 3)

1. **Create separate internal documentation** for sensitive deployment details
2. **Implement access controls** for system admin documentation
3. **Establish content review process** before publishing infrastructure details
4. **Create sanitized public versions** of deployment guides

---

## Risk Assessment

### High Risk Exposures

1. **Security Vulnerabilities Publicly Disclosed**: Reveals specific security weaknesses that attackers could exploit
2. **Complete Infrastructure Map**: All API Gateway IDs, S3 buckets, Lambda functions exposed
3. **Internal Service Names**: Reveals internal architecture and naming conventions

### Medium Risk Exposures

1. **Production Endpoint URLs**: Could enable targeted attacks
2. **Bucket Names**: Reveals data organization structure
3. **DynamoDB Table Names**: Reveals data model structure

### Low Risk Exposures

1. **AWS Region**: Common knowledge (`af-south-1`)
2. **General Architecture**: High-level only
3. **Code Examples**: Using placeholders

---

## Conclusion

**Current State**: The public documentation contains significant amounts of sensitive production infrastructure information that should be restricted.

**Recommended Approach**: 
1. Immediately remove/redact security vulnerability disclosures
2. Replace all production resource identifiers with generic placeholders
3. Create separate internal documentation for detailed deployment information
4. Implement content review process for future updates

**Estimated Effort**: 
- Immediate fixes: 2-4 hours
- Comprehensive review: 1-2 days
- Creating internal documentation: 2-3 days

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-15  
**Next Review**: After remediation actions completed
