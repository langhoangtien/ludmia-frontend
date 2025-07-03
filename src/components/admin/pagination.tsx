import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function PaginationControls({
  total,
  page,
  totalPages,
  pageSize,
  setPage,
  setPageSize,
  selectedCount,
}: {
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  selectedCount: number;
}) {
  console.log("Page Size:", pageSize);

  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <p className="text-muted-foreground">
        {selectedCount} of {total} row(s) selected.
      </p>
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <Select
          onValueChange={(value) => {
            setPage(1); // Reset to first page on page size change
            setPageSize(Number(value));
          }}
          value={String(pageSize)}
          defaultValue={String(pageSize)}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {["10", "25", "50", "100"].map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="p-1 hover:bg-accent rounded"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <ChevronsLeft strokeWidth={1.25} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="p-1 hover:bg-accent rounded"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <ChevronLeft strokeWidth={1.25} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="p-1 hover:bg-accent rounded"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight strokeWidth={1.25} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="p-1 hover:bg-accent rounded"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          <ChevronsRight strokeWidth={1.25} />
        </Button>
      </div>
    </div>
  );
}
