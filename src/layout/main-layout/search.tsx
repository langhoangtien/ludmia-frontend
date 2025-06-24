import Image from "@/components/image";
import SpinerLoading from "@/components/loading/spiner-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { API_URL } from "@/config";
import { useDebounce } from "@/hooks/use-debounce";
import { IProduct } from "@/types/product.type";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, SearchIcon, X, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

function highlightText(text: string, query: string) {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-accent">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function SearchHeader() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleCloseSheet = (value: boolean) => {
    setQuery("");
    setOpen(value);
  };
  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([]);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/products?search=${debouncedQuery}&limit=5`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuery(value);

    if (e.key === "Enter") {
      e.preventDefault();
      setOpen(false);
      navigate({ to: `/search?q=${value}` });
    }
  };

  const handleRedirect = () => {
    setOpen(false);
    navigate({ to: `/search?q=${query}` });
  };
  return (
    <Sheet open={open} onOpenChange={handleCloseSheet}>
      <SheetTrigger asChild>
        <div className="relative size-11 flex items-center justify-center cursor-pointer">
          <SearchIcon
            strokeWidth={1}
            size={22}
            className="cursor-pointer"
          ></SearchIcon>
        </div>
      </SheetTrigger>
      <SheetContent showClose={false} side={"top"}>
        <div className="w-full relative flex flex-row space-x-4 justify-center items-center py-8 px-4">
          <div className="w-full md:relative max-w-2xl">
            <div className="relative z-20 ">
              <div className="absolute inset-y-0 end-0 flex items-center space-x-1 pe-3.5 ">
                {!!query && (
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setQuery("")}
                      variant="outline"
                      className="rounded-full z-30 size-5 cursor-pointer "
                      size="icon"
                    >
                      <XIcon className="size-3" />
                    </Button>
                    <span className="w-[1px] mx-2 h-8 bg-gray-500"></span>
                  </div>
                )}

                <Button
                  onClick={handleRedirect}
                  variant="ghost"
                  size="icon"
                  className="dark:hover:bg-background"
                >
                  <SearchIcon className="size-5 " />
                </Button>
              </div>
              <input
                type="text"
                id="small_filled"
                value={query}
                onKeyDown={handleSearch}
                onChange={(e) => setQuery(e.target.value)}
                className="block bg-background  rounded-lg px-2.5 pb-2 border pt-5 w-full  text-base text-gray-700  focus-visible:outline-none focus-visible:ring focus-visible:ring-accent-foreground focus-visible:ring-offset appearance-none peer"
                placeholder=" "
              />
              <label
                htmlFor="small_filled"
                className="absolute text-base text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] start-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Search
              </label>
            </div>
            {query && (
              <Card className="absolute  left-0 z-10 md:top-12 pb-0 top-24 w-full border-t-0 rounded-b-md rounded-t-none  shadow-lg">
                <CardContent className="p-0">
                  {loading && (
                    <div className="w-full p-2 flex justify-center items-center">
                      {" "}
                      <SpinerLoading />
                    </div>
                  )}
                  {!loading && products.length === 0 && (
                    <p className="text-center p-2 text-gray-500">
                      No products found
                    </p>
                  )}
                  {!loading && !!products.length && (
                    <div className="flex flex-col p-2 gap-2 max-h-[420px] overflow-y-auto">
                      <p className="text-xs font-semibold text-gray-500 border-b  border-border pb-2 mb-2">
                        PRODUCTS
                      </p>
                      {products.map((product) => (
                        <Link
                          key={product._id}
                          to={`/products/${product.slug}`}
                          onClick={() => handleCloseSheet(false)}
                        >
                          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent ">
                            <Image
                              src={product.image || product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-medium">
                                <p className="font-medium">
                                  {highlightText(product.name, query)}
                                </p>
                              </p>
                              <p className="text-sm text-gray-500">
                                ${product.minPrice?.toFixed(2)}
                                {product.minCompareAtPrice && (
                                  <span className="ml-2 text-red-500 line-through">
                                    ${product.minCompareAtPrice.toFixed(2)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {!loading && (
                    <div
                      onClick={handleRedirect}
                      className="flex cursor-pointer items-center px-4 py-2 mt-2 border-t border-border justify-between"
                    >
                      <span>Search for "{query}"</span>
                      <ArrowRight
                        strokeWidth={1.25}
                        className="size-5 text-gray-500 cursor-pointer"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <SheetClose asChild>
            <X
              strokeWidth={1}
              className="h-7 w-7 text-gray-700 cursor-pointer"
            />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
