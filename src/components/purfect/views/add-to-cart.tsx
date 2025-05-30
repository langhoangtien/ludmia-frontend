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
import { CheckIcon } from "lucide-react";
import Image from "@/components/image";

type AddToCartSectionProps = {
  product: IProduct;
  setVariant: (variant: IVariant) => void;
  variant: IVariant | null;
};

export function AddToCartSection({
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
      <div>
        {product.variantOptions.map((option: IVariantOption) => (
          <div className="mt-4 flex flex-col space-y-3" key={option.name}>
            <h4>{option.name}</h4>
            <div className="flex flex-wrap items-center gap-2">
              {option.values.map((value: IVariantOptionValue) => (
                <OptionSelect
                  value={value}
                  handleOptionChange={handleOptionChange}
                  optionName={selectedOptions[option.name]}
                  option={option}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={handleAddToCart}
        className="w-full  h-12 text-base font-semibold"
      >
        Add To Cart | 50% OFF ➜
      </Button>
    </div>
  );
}

type OptionProps = {
  value: IVariantOptionValue;
  option: IVariantOption;
  optionName: string;
  handleOptionChange: (name: string, value: string) => void;
};
const OptionSelect = ({
  value,
  option,
  optionName,
  handleOptionChange,
}: OptionProps) => {
  if (option.type === "color")
    return (
      <span
        key={value.title}
        onClick={() => handleOptionChange(option.name, value.title)}
        className={`rounded-full   border-2 flex justify-center items-center cursor-pointer ${
          optionName === value.title ? " size-9 " : "size-8 "
        }`}
        style={{ backgroundColor: value.color }}
      >
        {optionName === value.title && (
          <CheckIcon className="text-accent size-4" />
        )}
      </span>
    );

  if (option.type === "image")
    return (
      <Image
        key={value.title}
        onClick={() => handleOptionChange(option.name, value.title)}
        className={`rounded-xs size-10 border flex justify-center items-center cursor-pointer ${
          optionName === value.title
            ? " border-accent-foreground "
            : "border-border "
        }`}
        src={value.image}
      ></Image>
    );
  return (
    <Button
      variant={"outline"}
      size="lg"
      key={value.title}
      onClick={() => handleOptionChange(option.name, value.title)}
      className={`${
        optionName === value.title
          ? "border-accent-foreground dark:border-accent-foreground"
          : "border-border "
      }`}
    >
      {value.title}
    </Button>
  );
};
