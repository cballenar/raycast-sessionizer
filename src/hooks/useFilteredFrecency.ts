import { useFrecencySorting } from "@raycast/utils";
import { useLocalStorage } from "@raycast/utils";
import { getPreferenceValues } from "@raycast/api";
import { useMemo } from "react";

interface Preferences {
  minimumVisitThreshold: string;
}

interface VisitCounts {
  [key: string]: number;
}

/**
 * Enhanced frecency hook that filters items based on minimum visit threshold.
 * Items must be visited at least the configured number of times before they
 * appear in frecency-sorted results, making the algorithm less sensitive.
 */
export default function useFilteredFrecency(
  data: string[] | undefined,
  options: {
    key?: (item: string) => string;
    namespace?: string;
  } = {}
) {
  const preferences = getPreferenceValues<Preferences>();
  const minimumVisits = parseInt(preferences.minimumVisitThreshold, 10);
  
  // Track visit counts using local storage
  const { value: visitCounts = {}, setValue: setVisitCounts } = useLocalStorage<VisitCounts>(
    `filtered-frecency-visits-${options.namespace || "default"}`,
    {}
  );

  // Use standard frecency sorting
  const { data: sortedData, visitItem: originalVisitItem, resetRanking } = useFrecencySorting(data, {
    key: options.key || ((item: string) => item),
    namespace: options.namespace,
  });

  // Filter items based on visit count threshold
  const filteredData = useMemo(() => {
    if (!sortedData || minimumVisits <= 1) {
      return sortedData;
    }

    return sortedData.filter((item) => {
      const key = options.key ? options.key(item) : item;
      const count = visitCounts[key] || 0;
      return count >= minimumVisits;
    });
  }, [sortedData, visitCounts, minimumVisits, options.key]);

  // Enhanced visit function that also tracks our custom counts
  const visitItem = async (item: string) => {
    // Call original visit function for frecency
    await originalVisitItem(item);
    
    // Track our custom visit count
    const key = options.key ? options.key(item) : item;
    const newCounts = { ...visitCounts };
    newCounts[key] = (newCounts[key] || 0) + 1;
    await setVisitCounts(newCounts);
  };

  // Enhanced reset function that also clears our custom counts
  const resetItemRanking = async (item: string) => {
    // Call original reset function
    await resetRanking(item);
    
    // Reset our custom visit count
    const key = options.key ? options.key(item) : item;
    const newCounts = { ...visitCounts };
    delete newCounts[key];
    await setVisitCounts(newCounts);
  };

  return {
    data: filteredData,
    visitItem,
    resetRanking: resetItemRanking,
  };
}