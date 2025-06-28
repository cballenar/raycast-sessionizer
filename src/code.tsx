import { ActionPanel, Detail, List, Action, Icon, showHUD, showToast, Toast } from "@raycast/api";
import useDirectories from "./hooks/useDirectories";
import { openInEditor } from "./utils/openEditor";
import { useState } from "react";
import { getAvailableEditors } from "./utils/editors";

export default function Command() {
  const { data, isLoading, error } = useDirectories();
  const [input, setInput] = useState<string>("");
  const availableEditors = getAvailableEditors();

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
              {availableEditors.map((editor, editorIndex) => (
                <Action
                  key={editorIndex}
                  title={`Open in ${editor.name}`}
                  icon={editor.icon}
                  onAction={async () => {
                    try {
                      openInEditor(editor.id, path);
                      if (editor.id === "finder") {
                        await showHUD(`📁 Project opened in ${editor.name}.`);
                      } else {
                        await showHUD(`🚀 Project opened in ${editor.name}.`);
                      }
                    } catch (error) {
                      await showToast({
                        style: Toast.Style.Failure,
                        title: "Error",
                        message: (error as Error).message,
                      });
                    }
                  }}
                />
              ))}
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
              {availableEditors
                .filter((editor) => editor.id !== "finder") // Don't show finder for creation
                .map((editor, editorIndex) => (
                  <Action
                    key={editorIndex}
                    title={`Create & Open in ${editor.name}`}
                    icon={editor.icon}
                    onAction={async () => {
                      try {
                        openInEditor(editor.id, input);
                        await showHUD(`✨ Project created and opened in ${editor.name}.`);
                      } catch (error) {
                        await showToast({
                          style: Toast.Style.Failure,
                          title: "Error",
                          message: (error as Error).message,
                        });
                      }
                    }}
                  />
                ))}
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
