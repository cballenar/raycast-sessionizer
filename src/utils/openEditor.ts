import { execSync } from "node:child_process";
import { Application, getPreferenceValues } from "@raycast/api";
import { join } from "node:path";
import { existsSync, lstatSync } from "node:fs";

interface Preferences {
  projectsDirectoryLevels: string;
  projectsDirectoryPath: string;
  preferredEditor: Application;
  terminalEmulatorPath: string;
  sessionizerPath: string;
}

const preferences = getPreferenceValues<Preferences>();

export function openInEditor(editor: string, path: string): void {
  // Strip out any repeating, leading and trailing slashes
  path = path.replace(/\/+/g, "/").replace(/^\/|\/$/g, "");

  // XOR if the path is valid relative to the projects directory levels.
  // This only works while the directory levels are 1 or 2.
  const slashMidString = /^.+\/.+?/;
  if ((preferences.projectsDirectoryLevels === "2") !== slashMidString.test(path) ) {
    throw new Error("The path is not valid for the selected project directory levels.");
  }

  // Join the path with the projects directory path
  const fullPath = join(preferences.projectsDirectoryPath, path);

  // Check if path resolves to a directory, otherwise create it.
  // If a matching file is found, a folder will still be created instead.
  if (!existsSync(fullPath) || !lstatSync(fullPath).isDirectory()) {
    execSync(`mkdir -p "${fullPath}"`);
  }

  let command = "";
  switch (editor) {
    case "code":
      command = `open -a ${preferences.preferredEditor.path?.replace(/ /g, "\\ ")} "${fullPath}"`;
      break;
    default:
      throw new Error("Missing or unsupported editor.");
  }
  execSync(command);
}
