"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/cart";
import {
  IProduct,
  IVariant,
  IVariantOption,
  IVariantOptionValue,
} from "@/types/product.type";

type AddToCartSectionProps = {
  product: IProduct;
  setVariant: (variant: IVariant) => void;
  variant: IVariant | null;
};

export function AddToCartPurfectSection({
  product,
  setVariant,
  variant,
}: AddToCartSectionProps) {
  const { addItem } = useCart();

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev: Record<string, string>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!variant) {
      toast.error("Please select a variant");
      return;
    }

    const id = variant._id?.split("/").pop();
    if (!id) {
      toast.error("Invalid variant id");
      return;
    }
    addItem({
      id,
      image: variant.image || "",
      name: product.name,
      price: variant.price,
      title: variant.title,
    });
  };

  const getSelectedVariant = () => {
    const matchedVariant = product.variants.find((variant: IVariant) =>
      variant.attributes.every(
        (opt: { name: string; title: string }) =>
          selectedOptions[opt.name] === opt.title
      )
    );
    if (matchedVariant) {
      setVariant(matchedVariant);
    }
  };

  // Chọn sẵn variant đầu tiên
  useEffect(() => {
    const firstVariant = product.variants[0];

    if (firstVariant) {
      const defaultOptions = firstVariant.attributes.reduce(
        (
          acc: Record<string, string>,
          option: {
            name: string;
            title: string;
          }
        ) => {
          acc[option.name] = option.title;
          return acc;
        },
        {}
      );

      setSelectedOptions(defaultOptions);
      setVariant(firstVariant);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Khi user chọn option, tự động cập nhật lại variant
  useEffect(() => {
    getSelectedVariant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);
  return (
    <div className="space-y-4">
      {product.variantOptions.map((option: IVariantOption) => (
        <div className="mt-6 flex flex-col space-y-4" key={option.name}>
          <h4>{option.name}</h4>
          <div className="flex flex-col gap-2">
            {option.values.map((value: IVariantOptionValue) => (
              <label
                onClick={() => handleOptionChange(option.name, value.title)}
                className={`flex text-background justify-between cursor-pointer items-center duration-300 transition-all rounded-full border h-19 py-6 px-4 border-border ${value.title === selectedOptions[option.name] ? "dark:bg-gray-300 bg-gray-900 " : "dark:bg-gray-100 bg-gray-600"}`}
                htmlFor={value.title}
                key={value.title}
              >
                <div className="flex items-center relative space-x-4">
                  <RadioCustom
                    checked={value.title === selectedOptions[option.name]}
                  />
                  <div className="space-y-0.5">
                    {" "}
                    <p className="text-xl ">{value.title}</p>
                    <p className="text-sm">{value.value}</p>
                  </div>
                </div>
                <div>
                  {" "}
                  <p className=" text-xl">${value.price}</p>
                  <p className="line-through text-gray-500 text-sm">
                    ${value.compareAtPrice}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <Button
        onClick={handleAddToCart}
        className="w-full  h-12 text-base font-semibold"
      >
        Add To Cart | 50% OFF ➜
      </Button>
    </div>
  );
}

const RadioCustom = ({ checked }: { checked: boolean }) => {
  return (
    <div className="flex border-2 border-background/80 items-center  justify-center rounded-full size-6">
      <span
        className={`${checked ? "size-3 bg-accent/80" : ""} rounded-full`}
      ></span>
    </div>
  );
};
