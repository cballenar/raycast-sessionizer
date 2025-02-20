import fs from "node:fs";
import { join } from "node:path";
import { useState, useEffect } from "react";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  projectsDirectoryPath: string;
}

const preferences = getPreferenceValues<Preferences>();

export default function useDirectories() {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  async function getDirectories() {
    // Read root directory
    const entries: fs.Dirent[] = fs.readdirSync(preferences.projectsDirectoryPath, { withFileTypes: true });

    // Get first level directories
    const dirs = await Promise.all(entries.map(async (entry) => {
      const fullPath = join(preferences.projectsDirectoryPath, entry.name);
      if (entry.isDirectory()) {

        // Get second level directories
        const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });
        const subDirs = subEntries.filter(subEntry => subEntry.isDirectory());
        return subDirs.map(subEntry => join(entry.name, subEntry.name));
      }
      return [];
    }));

    // Flatten the array
    return dirs.flat();
  }

  // Fetch data and update state
  useEffect(() => {
    async function fetchData() {
      try {
        const response = (await getDirectories()).join("\n");
        const result = response.split("\n").filter((line: string) => line.length > 0);
        setData(result);

      } catch (e: any) {
        setError(e);

      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [preferences.projectsDirectoryPath]);

  return { data, isLoading, error };
}
