# Sessionizer

Quick access to existing project directories in your preferred editor.

## Usage
- Search for a project and choose from multiple editors to open it with.
- If the directory doesn't exist, create it and open it on the fly.
- Switch between different editors on the fly for each project.

## Configure Extension

Sessionizer allows you to customize:

- **Projects Directory Path** - This is the root directory where all your projects are stored.
- **Projects Directory Levels** - This defaults to 1, which assumes all your projects are stored directly in the directory selected above. If you group your projects in subdirectories (e.g., Work, Personal, Others, etc.), you will want to set this to 2.
- **Preferred Editor** - Your main code editor, shown as the first option in the actions panel.
- **Second Preferred Editor** - Optional second editor for quick access when you frequently switch between two editors.
- **Custom Editor** - Configure a custom editor with its name and launch command. Use `$PATH` in the command to represent the project path.
- **Minimum Visit Threshold** - Controls how many times a project must be accessed before appearing in frecency-sorted results. Set to 1 for most sensitive (original behavior), or higher values like 3-5 for less sensitive ranking. Default is 3 visits.
- **Multi-editor support** - Each project shows actions for your preferred editors plus options to open in Finder for file browsing.

## Acknowledgements

Based on The Primeagen's tmux sessionizer.
