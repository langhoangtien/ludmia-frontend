import { X } from "lucide-react";
import { useState } from "react";
import { IVariantOptionValue } from "@/types/product.type";

type VariantOptionValuesInputProps = {
  values: IVariantOptionValue[]; // Thay values thành kiểu mới
  changeVariantOption: (values: IVariantOptionValue[]) => void;
};

export default function VariantOptionValuesInput({
  values,
  changeVariantOption,
}: VariantOptionValuesInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const removeVariantOptionValue = (index: number) => {
    console.log("remove", index);

    changeVariantOption(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      // Kiểm tra nếu giá trị đã tồn tại chưa
      const newValue: IVariantOptionValue = {
        title: inputValue.trim(),
        value: inputValue.trim().toLowerCase(),
        price: 0,
        compareAtPrice: 0,
        image: "",
        color: "#000000",
      };

      if (!values.some((v) => v.value === newValue.value)) {
        changeVariantOption([...values, newValue]);
      }

      setInputValue("");
      e.preventDefault();
    } else if (e.key === "Backspace" && inputValue === "") {
      changeVariantOption(values.slice(0, values.length - 1));
    }
  };

  return (
    <div className="flex flex-grow flex-wrap gap-2 min-h-9 border bg-background border-border px-2 py-1 rounded-md">
      {values.map((value, index) => (
        <span
          key={index}
          className="h-6 text-sm px-2 py-0.5 border-border bg-accent rounded inline-flex items-center justify-center"
        >
          {value.title} {/* Sử dụng title từ VariantOptionValue */}
          <X
            strokeWidth={1.25}
            size={16}
            className="ml-2 cursor-pointer"
            onClick={() => {
              console.log("remove", index);

              removeVariantOptionValue(index);
            }}
          />
        </span>
      ))}
      <input
        placeholder="Gõ và nhấn Enter để thêm giá trị VD: Xanh"
        className="border-none focus:outline-none flex-grow"
        value={inputValue}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
