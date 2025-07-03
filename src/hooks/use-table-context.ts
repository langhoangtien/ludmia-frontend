import { useTableContext } from "@/context/table-context";

export const useTableState = (tableKey: string) => {
  const { states, setTableState } = useTableContext();

  const state = states[tableKey] || {
    search: "",
    page: 1,
    sortField: "createdAt",
    sortOrder: "desc",
  };

  const setSearch = (v: string) => setTableState(tableKey, { search: v });
  const setPage = (v: number) => setTableState(tableKey, { page: v });
  const setSortField = (v: string) => setTableState(tableKey, { sortField: v });
  const setSortOrder = (v: "asc" | "desc") =>
    setTableState(tableKey, { sortOrder: v });

  return {
    ...state,
    setSearch,
    setPage,
    setSortField,
    setSortOrder,
  };
};
