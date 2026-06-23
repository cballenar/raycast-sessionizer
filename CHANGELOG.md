# Sessionizer Changelog

## [Unreleased]
### Added
- **Configurable Frecency Sensitivity**: Added "Minimum Visit Threshold" setting to control how many times a project must be accessed before appearing in frecency-sorted results. This addresses the issue where projects would jump to the top after just one access.
  - Options: 1, 2, 3, 5, or 10 visits
  - Default: 3 visits (recommended)
  - Setting of 1 maintains original behavior (most sensitive)
  - Higher values reduce sensitivity and prevent single-use projects from dominating the list

## [Initial Release] - 2025-02-21
- Launch Sessionizer extension with basic functionality.
- Allows selection of a projects directory with 1-2 levels.
- Allows selection of a preferred editor.
