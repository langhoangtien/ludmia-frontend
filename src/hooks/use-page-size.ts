// hooks/use-page-size.ts
import { useEffect, useState } from "react";

export function usePageSize(key: string, defaultSize = 10) {
  const STORAGE_KEY = `pageSize:${key}`;
  const [pageSize, setPageSize] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : defaultSize;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, pageSize.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  return { pageSize, setPageSize };
}
