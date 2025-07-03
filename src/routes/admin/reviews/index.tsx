import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, Edit, PlusIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from "@/hooks/use-debounce";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";
import { LoadingTable } from "@/components/loading/table-loading";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SortableHeader } from "@/components/admin/table-custom";
import { useTableState } from "@/hooks/use-table-context";
import { PaginationControls } from "@/components/admin/pagination";
import { usePageSize } from "@/hooks/use-page-size";

export const Route = createFileRoute("/admin/reviews/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ReviewPage />;
}

export interface Review {
  _id: string;
  customer: string;
  productId: string;
  title: string;
  body: string;
  createdAt: string;
  rating: number;
  liked: number;
  purchaseVerified: boolean;
  images: string[];
  videos: string[];
  reply?: string;
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const { pageSize, setPageSize } = usePageSize("reviews");

  const {
    search,
    setSearch,
    page,
    setPage,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = useTableState("reviews");

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page, sortField, sortOrder, pageSize]);
  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        `${API_URL}/reviews?page=${page}&limit=${pageSize}&search=${debouncedSearch}&sortBy=${sortField}&sortOrder=${sortOrder}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setReviews(data.data);
      setTotalPages(data.pagination?.totalPages ?? 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    setSortField(field);
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    // setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/reviews/delete-many`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedReviews }),
      });

      if (!res.ok) throw new Error("Failed to delete reviews");

      setSelectedReviews([]);
      setPage(1);
      fetchReviews();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else {
        setError("Unknown error");
      }
    }
  };

  const allSelected = useMemo(
    () => selectedReviews.length === reviews.length && reviews.length > 0,
    [selectedReviews, reviews]
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "App", href: "/admin" },
          { label: "Danh sách", isCurrent: true },
        ]}
      />
      <div className="p-6 relative space-y-4">
        {loading && <LoadingTable />}
        <div className="flex h-10 py-3 justify-between space-x-1 items-center">
          <Input
            className="max-w-xs"
            placeholder="Tìm theo tiêu đề hoặc tên khách hàng"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="flex space-x-2">
            <Button
              variant={selectedReviews.length ? "destructive" : "outline"}
              size="icon"
              onClick={handleDelete}
              disabled={!selectedReviews.length}
            >
              <TrashIcon strokeWidth={1} />
            </Button>
            <Link to="/admin/reviews/create">
              <Button size="icon">
                <PlusIcon strokeWidth={1.25} />
              </Button>
            </Link>
          </span>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <Table className="h-96 max-h-96 overflow-auto">
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) =>
                    setSelectedReviews(checked ? reviews.map((r) => r._id) : [])
                  }
                />
              </TableHead>
              <SortableHeader
                field="customer"
                label="Khách hàng"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                field="productId"
                label="URL Sản phẩm"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                field="title"
                label="Tiêu đề"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                field="rating"
                label="Đánh giá"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                field="liked"
                label="Lượt thích"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHead>Đã mua</TableHead>
              <SortableHeader
                field="createdAt"
                label="Ngày tạo"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />

              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedReviews.includes(review._id)}
                    onCheckedChange={(checked) =>
                      setSelectedReviews((prev) =>
                        checked
                          ? [...prev, review._id]
                          : prev.filter((id) => id !== review._id)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{review.customer}</TableCell>
                <TableCell>{review.productId}</TableCell>
                <TableCell>{review.title}</TableCell>
                <TableCell>{review.rating} ⭐</TableCell>

                <TableCell>{review.liked} </TableCell>
                <TableCell>
                  {!!review.purchaseVerified && (
                    <CheckIcon className="text-primary" size={16} />
                  )}
                </TableCell>
                <TableCell>
                  {new Date(review.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link
                    to="/admin/reviews/$reviewId"
                    params={{ reviewId: review._id }}
                  >
                    <Button variant="outline" size="icon">
                      <Edit strokeWidth={1} className="cursor-pointer" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <PaginationControls
          total={reviews.length}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          selectedCount={selectedReviews.length}
        />
      </div>
    </div>
  );
}
