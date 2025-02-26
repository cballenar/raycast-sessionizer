import { ActionPanel, Detail, List, Action, Icon, closeMainWindow, Application, showHUD } from "@raycast/api";
import useDirectories from "./hooks/useDirectories";
import { openInEditor } from "./utils/openEditor";
import { getPreferenceValues } from "@raycast/api";
import { useState } from "react";

interface Preferences {
  preferredEditor: Application;
}

const preferences = getPreferenceValues<Preferences>();

export default function Command() {
  const { data, isLoading, error } = useDirectories();
  const [input, setInput] = useState<string>("");

  if (isLoading) {
    return <List isLoading={true} />;
  }

  if (error) {
    return <Detail markdown={`Error: ${error.message}`} />;
  }

  return (
    <List filtering={true} onSearchTextChange={setInput}>
      {data.map((path: string, index: number) => (
        <List.Item
          key={index}
          icon={Icon.Folder}
          title={path}
          actions={
            <ActionPanel>
              <Action
                title={`Open in ${preferences.preferredEditor.name}`}
                onAction={async () => {
                  openInEditor("code", path);
                  closeMainWindow();
                }}
              />
            </ActionPanel>
          }
        />
      ))}
      {input && (
        <List.Item
          title={`Create Project: ${input}`}
          icon={Icon.NewFolder}
          actions={
            <ActionPanel>
              <Action
                title={`Create Project`}
                onAction={async () => {
                  openInEditor("code", input);
                  await showHUD("✨ Project created and opened in Visual Studio Code.");
                }}
              />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
