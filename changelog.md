---
title: "Changelog"
layout: default
nav_order: 11
---

# Changelog

All notable changes to the Ona Terminal platform are documented in this file.

## [1.6.0] - 2025-08-04

### Added
- **Production Verification**: Complete production deployment verification
- **15 Lambda Functions**: All core services deployed in af-south-1
- **7 API Gateway Endpoints**: Full API infrastructure operational
- **11 S3 Buckets**: Complete data storage infrastructure
- **Auth0 Integration**: User authentication system operational
- **Weather Services**: 4 weather-related Lambda functions
- **PDF Processing**: Document processing capabilities
- **Logging Proxy**: Centralized logging system
- **Documentation Updates**: Enhanced documentation with consistent styling and navigation

### Changed
- **Test Coverage**: Improved from 0% to 23% coverage
- **API Documentation**: Comprehensive API reference documentation
- **Deployment Guides**: Complete deployment documentation
- **CLI Tools**: Enhanced command-line interface
- **UI/UX**: Updated SVG images and card layouts for better user experience

### Fixed
- **API Gateway Integration**: All endpoints properly configured
- **Lambda Function Deployment**: All functions operational
- **S3 Bucket Configuration**: Proper bucket policies and access
- **DynamoDB Tables**: API key management operational
- **Documentation Consistency**: Fixed footer consistency across all pages

### Known Issues
- **SageMaker Endpoints**: 8 endpoints failed - ML inference broken
- **Security Issues**: 950+ wildcard imports, 14 dependency vulnerabilities
- **Test Coverage**: Only 23% with critical gaps
- **generateForecast**: Core module exists but not deployed

## [1.5.0] - 2025-07-29

### Added
- **Agentic Workflows**: Showcasing agentic use of Ona power tools
- **Discord Integration**: Community buttons across all documentation pages
- **Enhanced Navigation**: Re-architected documentation flow
- **Automated Testing**: Test criteria for new issues

### Changed
- **Documentation Architecture**: Improved documentation structure and flow
- **Community Features**: Enhanced Discord community integration
- **Styling**: Updated styling for better user experience

### Fixed
- **Documentation Consistency**: Improved footer and styling consistency
- **Navigation**: Fixed navigation bar and legal docs section

## [1.4.0] - 2025-04-14

### Added
- **Legal Documentation**: Added legal docs section
- **Enhanced Navigation**: Updated navigation bar
- **Improved Styling**: Enhanced CSS styling

### Changed
- **Documentation Structure**: Updated index and navigation structure
- **UI Improvements**: Enhanced styling and layout

### Fixed
- **Navigation Issues**: Fixed navigation bar functionality
- **Styling Consistency**: Improved CSS consistency

## [1.3.0] - 2024-10-25

### Added
- **Initial Documentation**: Created main.md and README.md
- **Jekyll Configuration**: Set up _config.yml for GitHub Pages
- **Basic Structure**: Established basic documentation structure

### Changed
- **Documentation Setup**: Initial documentation framework
- **Configuration**: Basic Jekyll configuration

### Fixed
- **Initial Setup**: Basic documentation structure and configuration

## [1.2.0] - 2024-10-24

### Added
- **Repository Creation**: Initial repository setup
- **Basic Documentation**: First documentation files

### Changed
- **Project Foundation**: Initial project setup

### Fixed
- **Basic Setup**: Repository and documentation foundation

## [1.1.0] - 2024-10-24

### Added
- **Initial Release**: First repository commit
- **Core Documentation**: Basic documentation structure

### Changed
- **Platform Foundation**: Initial platform setup

### Fixed
- **Core Functionality**: Basic documentation functionality

## [1.0.0] - 2024-10-24

### Added
- **Initial Release**: First production release
- **Core Infrastructure**: Basic documentation infrastructure
- **Documentation Framework**: Initial documentation framework
- **GitHub Pages**: Basic GitHub Pages setup

### Changed
- **Platform Foundation**: Initial platform setup
- **Development Process**: Basic development workflow
- **Documentation**: Basic documentation structure

### Fixed
- **Core Functionality**: Basic platform functionality
- **Infrastructure**: Initial infrastructure setup
- **Documentation**: Basic documentation structure

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/asobacloud/terminal/tags).

## Release Types

- **Major Releases** (X.0.0): Breaking changes, major new features
- **Minor Releases** (X.Y.0): New features, backward compatible
- **Patch Releases** (X.Y.Z): Bug fixes, backward compatible

## Release Schedule

- **Major Releases**: Quarterly (every 3 months)
- **Minor Releases**: Monthly (every 4 weeks)
- **Patch Releases**: As needed (bug fixes and security updates)

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **API Reference**: [Complete API documentation](api-reference.md)
- 🔗 **Integration Guide**: [SDK and webhook integration](integration.md)
