import { ActionPanel, Detail, List, Action, Icon, showHUD, showToast, Toast } from "@raycast/api";
import useDirectories from "./hooks/useDirectories";
import useFilteredFrecency from "./hooks/useFilteredFrecency";
import { openInEditor } from "./utils/openEditor";
import { useState } from "react";
import { getAvailableEditors } from "./utils/editors";

export default function Command() {
  const { data, isLoading, error } = useDirectories();
  const { data: sortedData, visitItem, resetRanking } = useFilteredFrecency(data, {
    key: (item: string) => item,
  });
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
      {sortedData.map((path: string, index: number) => (
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
                      await visitItem(path);
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
              <Action
                title="Reset Ranking"
                icon={Icon.ArrowCounterClockwise}
                onAction={async () => {
                  try {
                    await resetRanking(path);
                    await showHUD("📊 Ranking reset for this project.");
                  } catch (error) {
                    await showToast({
                      style: Toast.Style.Failure,
                      title: "Error",
                      message: (error as Error).message,
                    });
                  }
                }}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
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
              {availableEditors
                .filter((editor) => editor.id !== "finder") // Don't show finder for creation
                .map((editor, editorIndex) => (
                  <Action
                    key={editorIndex}
                    title={`Create & Open in ${editor.name}`}
                    icon={editor.icon}
                    onAction={async () => {
                      try {
                        await visitItem(input);
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
