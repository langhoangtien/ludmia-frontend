import React, { createContext, useContext, useState, useMemo } from "react";

type SortOrder = "asc" | "desc";
const DEFAULT_STATE = {
  search: "",
  page: 1,
  sortField: "createdAt",
  sortOrder: "desc" as "asc" | "desc",
};
export interface TableState {
  search: string;
  page: number;
  sortField: string;
  sortOrder: SortOrder;
}

type TableContextType = {
  states: Record<string, TableState>;
  setTableState: (key: string, update: Partial<TableState>) => void;
};

const TableContext = createContext<TableContextType | null>(null);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [states, setStates] = useState<Record<string, TableState>>({});

  const setTableState = (key: string, update: Partial<TableState>) => {
    setStates((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] ?? DEFAULT_STATE), // Use default state if key doesn't exist
        ...update,
      },
    }));
  };

  const value = useMemo(() => ({ states, setTableState }), [states]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTableContext must be used inside TableProvider");
  return context;
};
