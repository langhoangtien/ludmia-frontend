import Image from "@/components/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/custom-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_URL } from "@/config";
import MainLayout from "@/layout/main-layout";
import { formatCurrency } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronDown, SearchIcon, TagIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { z } from "zod";
import { IProduct } from "./admin/products";

const searchSchema = z.object({
  q: z.string().optional().default(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,

  component: RouteComponent,
});

function RouteComponent() {
  return <SearchPage />;
}

const SORT_OPTIONS = [
  { name: "Feature", value: "minPrice", order: "asc" },
  { name: "Lasted", value: "createdAt", order: "asc" },
  { name: "Oldest", value: "createdAt", order: "desc" },
];
const SearchPage = () => {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q);
  const [sortBy, setSortBy] = useState<{
    name: string;
    value: string;
    order: string;
  }>({ name: "Feature", value: "minPrice", order: "asc" }); // <-- Chứa giá trị sortBy
  const [products, setProducts] = useState<IProduct[]>([]); // <-- Chứa danh sách sản phẩm
  const [loading, setLoading] = useState(false);

  // Gọi API fetch product
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/products?search=${encodeURIComponent(query)}&sortBy=${encodeURIComponent(sortBy.value)}&sortOrder=${encodeURIComponent(sortBy.order)}`
      );
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    navigate({
      to: `/search?q=${query}`,
    });
  };

  // Gọi lại API khi sortBy thay đổi
  useEffect(() => {
    fetchProducts();
  }, [sortBy, q]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-4 space-y-8 rounded-lg">
        <h1 className="text-3xl my-8 text-center font-semibold text-accent-foreground">
          Search Results
        </h1>

        <div className="max-w-2xl mx-auto">
          <Input
            className="focus:border-border"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search"
          >
            <div className="absolute inset-y-0 end-0 flex items-center space-x-1 pe-3.5 ">
              {!!query && (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setQuery("")}
                    variant="outline"
                    className="rounded-full z-30 size-5 cursor-pointer"
                    size="icon"
                  >
                    <XIcon className="size-3" />
                  </Button>
                  <span className="w-[1px] mx-2 h-8 bg-gray-500"></span>
                </div>
              )}

              <Button
                onClick={handleSearch}
                variant="ghost"
                size="icon"
                className="dark:hover:bg-background"
              >
                <SearchIcon className="size-5" />
              </Button>
            </div>
          </Input>
        </div>

        <div className="flex justify-end items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  {sortBy.name} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option)}
                  >
                    {option.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span>{loading ? "Loading..." : `${products.length} result(s)`}</span>
        </div>

        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Hiển thị danh sách sản phẩm */}
          {products.map((product: IProduct) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => {
                navigate({
                  to: `/products/${product.slug}`,
                });
              }}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

const getSalePercent = (
  minPrice: number,
  minCompareAtPrice: number
): number => {
  if (minCompareAtPrice === 0) return 0;
  return Math.round(((minCompareAtPrice - minPrice) / minCompareAtPrice) * 100);
};

const ProductCard = ({
  product,
  onClick,
}: {
  product: IProduct;
  onClick: () => void;
}) => {
  const discount = getSalePercent(
    product.minPrice || 0,
    product.minCompareAtPrice || 0
  );
  return (
    <div
      className="border overflow-hidden shadow-2xl space-y-4 rounded-md mb-2"
      onClick={onClick}
    >
      <Image
        className="w-full aspect-square rounded-t-md object-cover transition-transform duration-500 hover:scale-103"
        src={product.image || product.images[0] || ""}
      />
      {!!discount && (
        <span className="rounded-l-none rounded-r-md bg-primary inline-flex text-accent justify-center px-2 py-0.5 items-center">
          <TagIcon className="mr-1" size={16} /> Save {discount}%
        </span>
      )}
      <div className="text-center flex-flex-col text-sm md:text-lg  items-center justify-center p-2 space-y-2">
        <h3 className="hover:underline line-clamp-2 cursor-pointer">
          {product.name}
        </h3>
        <p className="space-x-2 font-semibold ">
          <span className="text-primary font-bold ">
            {formatCurrency(product.minPrice || 0)}
          </span>
          <span className="line-through text-sm md:text-base">
            {!!product.minCompareAtPrice &&
              formatCurrency(product.minCompareAtPrice)}
          </span>
        </p>
      </div>
    </div>
  );
};
