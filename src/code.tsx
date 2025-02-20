import { ActionPanel, Detail, List, Action, Icon, closeMainWindow } from "@raycast/api";
import useDirectories from "./hooks/useDirectories";
import { openInEditor } from "./utils/openEditor";

export default function Command() {
  const { data, isLoading, error } = useDirectories();

  if (isLoading) {
    return <List isLoading={true} />;
  }

  if (error) {
    return <Detail markdown={`Error: ${error.message}`} />;
  }

  return (
    <List>
      {data.map((path: string, index: number) => (
        <List.Item
          key={index}
          icon={Icon.Folder}
          title={path}
          actions={
            <ActionPanel>
              <Action
                // eslint-disable-next-line @raycast/prefer-title-case
                title="Open in VSCode"
                onAction={async () => {
                  openInEditor("code", path);
                  closeMainWindow();
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
