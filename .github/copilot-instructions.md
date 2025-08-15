# Raycast Sessionizer Extension

Raycast Sessionizer is a TypeScript/React-based Raycast extension that provides quick access to existing project directories in your preferred editor. The extension allows users to search for projects, create new ones on the fly, and open them in various editors like VSCode, Cursor, Vim, Sublime Text, or WebStorm.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup
- Ensure Node.js v20+ is installed
- Install dependencies: `npm install` -- takes ~3 seconds on subsequent runs, ~30 seconds on first run. NEVER CANCEL.
- The extension requires Raycast CLI for full functionality, but basic development is possible without it

### Building and Development
- **Build the extension**: `npm run build` -- takes ~1 second. NEVER CANCEL.
  - Uses `ray build` internally to compile TypeScript and generate extension bundle
  - Build succeeds even without Raycast app running
- **Development mode**: `npm run dev` -- takes ~1 second to start. NEVER CANCEL.
  - Uses `ray develop` to enable hot reloading
  - Requires Raycast app to be running for full testing
  - Shows "Raycast is not running" warning if Raycast app is closed

### Code Quality and Validation
- **TypeScript compilation**: `npx tsc --noEmit` -- takes ~2 seconds. NEVER CANCEL.
  - Validates TypeScript without the Raycast CLI
  - Use this for type checking when ray CLI is unavailable
- **Linting**: `npm run lint` -- takes ~5 seconds. NEVER CANCEL.
  - May fail with network errors if raycast.com is unreachable
  - Uses `ray lint` which validates package.json against Raycast schemas
- **Fix linting issues**: `npm run fix-lint` -- takes ~5 seconds. NEVER CANCEL.
  - Automatically fixes Prettier formatting issues
- **Direct ESLint**: `npx eslint src` -- takes ~3 seconds. NEVER CANCEL.
  - Alternative linting without Raycast CLI dependencies
- **Direct Prettier check**: `npx prettier --check src` -- takes ~1 second. NEVER CANCEL.

### Manual Testing and Validation
- **CRITICAL**: This extension cannot be fully tested without the Raycast desktop app installed
- The extension requires specific preferences to be configured:
  - Projects Directory Path (e.g., `/Users/username/Projects/`)
  - Projects Directory Levels (1 or 2 levels deep)
  - Preferred Editor selection
- **Basic validation**: Build succeeds and TypeScript compiles without errors
- **Functional testing requires**: Raycast app + proper preference configuration

### Development Scenarios to Test:
After making changes, always test these scenarios when possible:
1. **Search for existing projects** - Verify directory scanning works
2. **Create new project** - Test project creation and editor opening
3. **Editor switching** - Test different editor integrations
4. **Frecency sorting** - Verify project ranking updates with usage
5. **Path validation** - Test with different directory structures

## Validation Requirements

### ALWAYS run these validation steps after making changes:
1. `npm run build` -- ensure extension builds successfully
2. `npx tsc --noEmit` -- verify TypeScript compilation
3. `npx prettier --check src` -- confirm code formatting
4. `npx eslint src` -- validate code quality (if network allows)

### CRITICAL Limitations in this Environment:
- **Cannot fully test functionality** without Raycast desktop app
- **Cannot test editor integration** (VSCode, Cursor, etc.) without proper setup
- **Cannot test file system operations** without valid project directories
- **Network-dependent operations may fail** (Raycast schema validation)

## Architecture and Navigation

### Repository Structure:
```
raycast-sessionizer/
├── .github/              # GitHub configurations and workflows
├── assets/               # Extension icon and visual assets  
├── metadata/            # Screenshots for Raycast Store
├── src/                 # TypeScript/React source code
│   ├── code.tsx         # Main command component (116 lines)
│   ├── hooks/           # React hooks
│   │   └── useDirectories.ts  # Directory scanning logic (67 lines)
│   └── utils/           # Utility functions
│       ├── editors.ts   # Editor configuration (67 lines)
│       └── openEditor.ts # Project opening logic (85 lines)
├── package.json         # Dependencies, scripts, Raycast config
├── tsconfig.json        # TypeScript compilation settings
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Code formatting rules
└── README.md           # Project documentation
```

### Key Source Files (335 total lines):
- **`src/code.tsx`** (116 lines) - Main command component with UI and actions
- **`src/utils/openEditor.ts`** (85 lines) - Core logic for opening projects in editors  
- **`src/hooks/useDirectories.ts`** (67 lines) - React hook for reading project directories
- **`src/utils/editors.ts`** (67 lines) - Editor configuration and availability logic

### Critical Configuration Files:
- **`package.json`** - Extension metadata, dependencies, and Raycast configuration
- **`.eslintrc.json`** - Extends `@raycast` ESLint configuration
- **`.prettierrc`** - Code formatting rules (120 char width, double quotes)
- **`tsconfig.json`** - TypeScript compilation settings

### Key Directories:
- **`src/`** - All TypeScript/React source code
- **`assets/`** - Extension icon (`extension-icon.png`)
- **`metadata/`** - Screenshots for Raycast Store listing
- **`node_modules/`** - Dependencies (excluded from git)

## Common Development Tasks

### Making Code Changes:
1. Always start with `npm install` if dependencies may have changed
2. Make your changes to TypeScript files in `src/`
3. Run `npm run build` to validate the build
4. Run `npx tsc --noEmit` for type checking
5. Run `npx prettier --check src` to verify formatting
6. For actual testing, you need Raycast desktop app + proper configuration

### Debugging Build Issues:
- **TypeScript errors**: Check `npx tsc --noEmit` output for type issues
- **Import/export issues**: Verify paths and exported functions
- **Missing dependencies**: Check if new imports require additional packages
- **Raycast-specific errors**: Ensure compliance with Raycast API patterns

### Working with Editor Integration:
- Editor commands are defined in `src/utils/openEditor.ts`
- Supported editors configured in `src/utils/editors.ts`
- Custom editor support available through preferences
- **CRITICAL**: Editor testing requires actual editor installations

### Project Directory Handling:
- Supports 1-2 levels of directory nesting
- Path validation in `assertValidPath()` function
- Directory scanning logic in `useDirectories.ts`
- **CRITICAL**: Requires valid project directory structure for testing

## Raycast Extension Specifics

### Extension Configuration:
- **Command**: "Start Code Session" - opens project selection UI
- **Preferences**: Projects path, directory levels, editor selection
- **Icons**: Uses Raycast Icon components for consistent UI
- **Actions**: ActionPanel with editor-specific actions

### Raycast API Usage:
- `@raycast/api` - Core Raycast components and utilities
- `@raycast/utils` - Additional utilities like frecency sorting
- React patterns specific to Raycast extensions
- Preference management through `getPreferenceValues()`

### Publishing and Distribution:
- **Publish**: `npm run publish` -- uses `npx @raycast/api@latest publish`
- **NEVER** use `npm publish` (blocked by prepublishOnly script)
- Requires Raycast Store approval process

## Time Expectations

### Common Command Timing:
- `npm install`: ~3 seconds (subsequent), ~30 seconds (first time)
- `npm run build`: <1 second  
- `npm run dev`: <1 second to start
- `npx tsc --noEmit`: ~2 seconds
- `npm run lint`: ~3 seconds (may fail due to network)
- `npx eslint src`: ~1.5 seconds
- `npx prettier --check src`: <1 second

### NEVER CANCEL these operations:
- **Build operations**: Always fast (<5 seconds) but wait for completion
- **Dependency installation**: May take up to 60 seconds on slow networks
- **Development mode**: Runs continuously until stopped

## Troubleshooting

### Network Issues:
- Raycast schema validation may fail without internet access
- Use direct TypeScript/ESLint tools as alternatives
- Build and basic development work offline

### Missing Raycast App:
- Development mode shows warnings but still compiles
- Cannot test actual extension functionality
- Focus on code quality and TypeScript validation

### Path and Editor Issues:
- Verify project directory exists and has proper structure
- Ensure editor commands are valid for the target system
- Test path validation logic with different directory structures

### Common Errors:
- "Invalid author" - Network connectivity to raycast.com required
- "Raycast is not running" - Expected when app not installed
- TypeScript compilation errors - Fix imports and type issues first
- Prettier formatting - Run `npx prettier --write src` to fix

## Quick Reference Outputs

### Repository Structure (ls -la):
```
total 164
drwxr-xr-x 6 runner docker   4096 .
drwxr-xr-x 3 runner docker   4096 ..
-rw-r--r-- 1 runner docker     46 .eslintrc.json
drwxr-xr-x 7 runner docker   4096 .git
-rw-r--r-- 1 runner docker    230 .gitignore
-rw-r--r-- 1 runner docker     48 .prettierrc
-rw-r--r-- 1 runner docker    218 CHANGELOG.md
-rw-r--r-- 1 runner docker   1267 README.md
drwxr-xr-x 2 runner docker   4096 assets
drwxr-xr-x 2 runner docker   4096 metadata
-rw-r--r-- 1 runner docker 114019 package-lock.json
-rw-r--r-- 1 runner docker   3893 package.json
drwxr-xr-x 4 runner docker   4096 src
-rw-r--r-- 1 runner docker    409 tsconfig.json
```

### Successful Build Output:
```
> build
> ray build

info  - entry points ["src/code.tsx"]
info  - compiled entry points
info  - generated extension's TypeScript definitions
ready  - built extension successfully
```

### Development Mode Output (Expected):
```
> dev
> ray develop

warn  - Raycast is not running
info  - entry points ["src/code.tsx"]
info  - compiled entry points
info  - generated extension's TypeScript definitions
ready  - built extension successfully
warn  - Raycast is not running
```