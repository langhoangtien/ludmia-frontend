import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { Edit, PlusIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { useDebounce } from "@/hooks/use-debounce";
// import SkeletonTable from "@/components/skeleton-table";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";

export const Route = createFileRoute("/admin/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductPage />;
}

export interface Variant {
  price: number;
  salePrice: number;
  stock: number;
  attributes: { name: string; value: string }[];
  image: string;
  sku?: string;
  _id?: string;
}
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  introduction?: string;
  minPrice?: number;
  minSalePrice?: number;
  image: string;
  images: string[];
  variantOptions: { name: string; values: string[] }[];
  createdAt?: string;
  variants: Variant[];
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchProduct();
  }, [debouncedSearch, page]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        `${API_URL}/products?page=${page}&limit=10&search=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch Product");

      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);

      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/products/delete-many`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedProducts }),
      });

      if (!res.ok) throw new Error("Failed to delete Product");

      setSelectedProducts([]);
      fetchProduct();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex h-10 py-3 justify-between space-x-1 items-center">
        <Input
          className="max-w-xs"
          placeholder="Tìm tên hoặc URL"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="flex space-x-2">
          {" "}
          <Button
            variant={"outline"}
            size="icon"
            onClick={handleDelete}
            disabled={!selectedProducts.length}
          >
            <TrashIcon
              className={`${selectedProducts.length ? "text-destructive" : ""}`}
              strokeWidth={1}
            />
          </Button>
          <Link to="/admin/products/create">
            <Button size="icon">
              <PlusIcon />
            </Button>
          </Link>
        </span>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={(checked) =>
                  setSelectedProducts(checked ? products.map((u) => u._id) : [])
                }
              />
            </TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Giá khuyến mãi</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          "loading"
        ) : (
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product._id)}
                    onCheckedChange={(checked) =>
                      setSelectedProducts((prev) =>
                        checked
                          ? [...prev, product._id]
                          : prev.filter((id) => id !== product._id)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.slug}</TableCell>
                <TableCell>{product.minPrice}</TableCell>
                <TableCell>
                  {new Date(product.createdAt || "").toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link
                    to="/admin/products/$productId"
                    params={{ productId: product._id }}
                  >
                    <Button variant="outline" size="icon">
                      <Edit strokeWidth={1} className="cursor-pointer" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <div className="flex justify-between mt-4">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
