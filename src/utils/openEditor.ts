import { execSync } from "node:child_process";
import { getPreferenceValues } from "@raycast/api";
import { join } from "node:path";

interface Preferences {
  projectsDirectoryPath: string;
  terminalEmulatorPath: string;
  sessionizerPath: string;
}

const preferences = getPreferenceValues<Preferences>();

export function openInEditor(editor: string, path: string): void {
  const fullPath = join(preferences.projectsDirectoryPath, path);
  let command = "";
  switch (editor) {
    case "code":
      command = `code ${fullPath}`;
      break;
    case "vi":
      command = `${preferences.terminalEmulatorPath} -e ${preferences.sessionizerPath} ${path}`;
      break;
    default:
      throw new Error("Missing or unsupported editor.");
  }
  execSync(command);
}
