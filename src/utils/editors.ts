import { Icon, getPreferenceValues } from "@raycast/api";

interface Preferences {
  preferredEditor: string;
  secondPreferredEditor?: string;
  customEditorName?: string;
  customEditorCommand?: string;
}

export interface Editor {
  id: string;
  name: string;
  icon: Icon;
}

const EDITOR_DEFINITIONS: Record<string, { name: string; icon: Icon }> = {
  vscode: { name: "Visual Studio Code", icon: Icon.Code },
  cursor: { name: "Cursor", icon: Icon.Code },
  vim: { name: "Vim", icon: Icon.Terminal },
  sublime: { name: "Sublime Text", icon: Icon.Text },
  webstorm: { name: "WebStorm", icon: Icon.Code },
};

export function getAvailableEditors(): Editor[] {
  const preferences = getPreferenceValues<Preferences>();
  const editors: Editor[] = [];

  // Add preferred editor
  const preferredDef = EDITOR_DEFINITIONS[preferences.preferredEditor];
  if (preferredDef) {
    editors.push({
      id: preferences.preferredEditor,
      name: preferredDef.name,
      icon: preferredDef.icon,
    });
  }

  // Add second preferred editor if configured and different from first
  if (preferences.secondPreferredEditor && preferences.secondPreferredEditor !== preferences.preferredEditor) {
    const secondPreferredDef = EDITOR_DEFINITIONS[preferences.secondPreferredEditor];
    if (secondPreferredDef) {
      editors.push({
        id: preferences.secondPreferredEditor,
        name: secondPreferredDef.name,
        icon: secondPreferredDef.icon,
      });
    }
  }

  // Add custom editor if configured
  if (preferences.customEditorName && preferences.customEditorCommand) {
    editors.push({
      id: "custom",
      name: preferences.customEditorName,
      icon: Icon.Gear,
    });
  }

  // Always add Finder option
  editors.push({
    id: "finder",
    name: "Finder",
    icon: Icon.Finder,
  });

  return editors;
}
