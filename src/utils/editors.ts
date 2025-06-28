import { Icon } from "@raycast/api";

export interface Editor {
  id: string;
  name: string;
  icon: Icon;
}

export const AVAILABLE_EDITORS: Editor[] = [
  {
    id: "preferred",
    name: "Preferred Editor",
    icon: Icon.Star,
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    icon: Icon.Code,
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: Icon.Code,
  },
  {
    id: "vim",
    name: "Vim",
    icon: Icon.Terminal,
  },
  {
    id: "nvim",
    name: "Neovim",
    icon: Icon.Terminal,
  },
  {
    id: "sublime",
    name: "Sublime Text",
    icon: Icon.Text,
  },
  {
    id: "webstorm",
    name: "WebStorm",
    icon: Icon.Code,
  },
];