import { useEffect, useRef, useState } from "react";
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
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUp,
  Loader2,
  PencilLineIcon,
  PlusIcon,
  Trash2Icon,
  X,
} from "lucide-react";

import UploadIllustration from "@/assets/illustrations/upload-illustration";

import { toSlug } from "@/lib/utils";
import VariantOptionValuesInput from "./variant-option";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";
import { uploadImg, uploadImgs } from "@/lib/common";
import { useNavigate } from "@tanstack/react-router";
import Editor from "../editor";
import Image from "../image";
import { Textarea } from "../ui/textarea";
import Breadcrumbs from "../ui/breadcrumbs";
import Autocomplete from "../ui/autocomplete";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  IProduct,
  IVariantAttribute,
  IVariantOption,
} from "@/types/product.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const variantZodSchema = z
  .object({
    attributes: z.array(
      z.object({
        name: z.string(),
        title: z.string(),
      })
    ),
    price: z.number().nonnegative(),
    title: z.string().optional(),
    compareAtPrice: z.number().nonnegative(),
    image: z.string().max(200).optional(),
    stock: z.number().int().nonnegative(),
    sku: z.string().optional(),
    _id: z.string().optional(),
  })
  .superRefine((variant, ctx) => {
    if (!!variant.compareAtPrice && variant.price > variant.compareAtPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Price must be less than or equal to compareAtPrice",
        path: ["price"],
      });
    }
  });

const productSchema = z.object({
  name: z.string().min(1).max(200),
  image: z.string().max(200).optional(),
  slug: z.string().max(100).optional(),
  categories: z.array(z.string()).optional().default([]),
  images: z.array(z.string().max(200)).optional().default([]),
  description: z.string().optional(),
  introduction: z.string().optional(),
  rating: z.array(z.number()).optional().default([0, 0, 0, 0, 0]),
  collections: z
    .array(z.object({ title: z.string(), value: z.string() }))
    .optional()
    .default([]),
  averageRating: z.number().optional().default(0),
  accordion: z.string().optional(),
  accordionItems: z
    .array(
      z.object({
        title: z.string().min(1).max(50),
        value: z.string().min(1),
      })
    )
    .optional()
    .default([]),
  variantOptions: z
    .array(
      z.object({
        values: z.array(
          z.object({
            value: z.string().max(50),
            title: z.string().max(50),
            image: z.string().max(50),
            color: z.string().max(50),
            price: z.number().optional(),
            compareAtPrice: z.number().optional(),
          })
        ),
        name: z.string().max(50),
        key: z.string().max(50),
        type: z.enum(["select", "button", "color", "radio", "image"]),
      })
    )
    .optional()
    .default([]),

  variants: z.array(variantZodSchema).min(1),
});

const INIT_FORM_DATA = {
  _id: "",
  name: "",
  slug: "",
  images: [],
  description: "",
  variantOptions: [],
  variants: [
    {
      attributes: [],
      price: 0,
      stock: 0,
      sku: "",
      compareAtPrice: 0,
      image: "",
      title: "",
      _id: "",
      productId: "",
    },
  ],
  accordion: "",
  accordionItems: [],
  rating: [0, 0, 0, 0, 0],
  averageRating: 0,
  collections: [],
  image: "",
  introduction: "",
  createdAt: "",
  categories: [],
  minPrice: 0,
  minCompareAtPrice: 0,
};
export default function ProductForm({ id }: { id?: string }) {
  const [formData, setFormData] = useState<IProduct>(INIT_FORM_DATA);
  const [variantOptions, setVariantOptions] = useState<IVariantOption[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<{ getContent: () => string } | null>(null);
  const navigate = useNavigate();
  const validateForm = () => {
    const result = productSchema.safeParse(formData);
    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path.join(".")] = err.message;
      });
      setErrors(errorMap);
      console.log(errorMap);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      return content;
    }
    return "";
  };
  const fetchData = async (id: string | null) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
      const res = await fetch(`${API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
      const data = await res.json();

      setFormData(data);
      setVariantOptions(data.variantOptions || []);
    } catch (error) {
      console.error(error);
      toast.error("Không thể lấy dữ liệu review, thử lại sau!");
    }
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
    } else {
      setFormData(INIT_FORM_DATA);
      setVariantOptions([]);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const imageUpload = await uploadImg(e);
    if (!imageUpload) return;
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index] = { ...newVariants[index], image: imageUpload };
      return { ...prev, variants: newVariants };
    });
  };

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true); // Thêm trạng thái loading

    const imagesUpload = await uploadImgs(e);
    if (!imagesUpload) {
      setIsUploading(false);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imagesUpload],
    }));
    setIsUploading(false);
  };

  const handleVariantChange = (
    index: number,
    key: string,
    value: string | number
  ) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index] = { ...newVariants[index], [key]: value };
      return { ...prev, variants: newVariants };
    });
  };

  const handleChangeVariantOptionValue = (
    name: string,
    value: string | number,
    index: number,
    valueIndex: number
  ) => {
    const newValues = [...variantOptions[index].values];
    newValues[valueIndex] = { ...newValues[valueIndex], [name]: value };
    setVariantOptions((prev) => {
      const newVariantOptions = [...prev];
      newVariantOptions[index] = {
        ...newVariantOptions[index],
        values: newValues,
      };
      return newVariantOptions;
    });
  };

  const generateVariants = () => {
    const getValidOptions = (options: IVariantOption[]) => {
      const seenNames = new Set<string>();

      return options.filter((option) => {
        const isValid =
          option.name.trim() !== "" &&
          option.key.trim() !== "" &&
          option.values.length > 0;

        const isDuplicate = seenNames.has(option.name.trim());

        if (isValid && !isDuplicate) {
          seenNames.add(option.name.trim());
          return true;
        }

        return false;
      });
    };

    const filteredOptions = getValidOptions(variantOptions);

    if (filteredOptions.length === 0) {
      setFormData((prev) => ({ ...prev, variantOptions: [] }));
      setVariantOptions([]);
      return [
        {
          attributes: [],
          price: 0,
          compareAtPrice: 0,
          stock: 0,
          sku: "",
          image: "",
          title: "",
          key: "",
        },
      ];
    }

    // Tạo danh sách các giá trị của từng option
    const valuesList = filteredOptions.map((option) =>
      option.values.map((val) => ({
        key: option.key,
        name: option.name,
        value: val.value,
        title: val.title,
        image: val.image,
        color: val.color,
        price: val.price,
        compareAtPrice: val.compareAtPrice,
      }))
    );

    // Sinh tích Descartes của các mảng con
    const generateCombinations = (
      lists: IVariantAttribute[][]
    ): IVariantAttribute[][] => {
      if (lists.length === 0) return [];

      return lists.reduce<IVariantAttribute[][]>((acc, currentList) => {
        if (acc.length === 0) return currentList.map((item) => [item]);

        return acc.flatMap((accItem) =>
          currentList.map((currItem) => [...accItem, currItem])
        );
      }, []);
    };

    const variantCombinations = generateCombinations(valuesList);

    const variants = variantCombinations.map((attributes) => ({
      attributes,
      price: 0,
      compareAtPrice: 0,
      stock: 0,
      sku: "",
      image: "",
      title: attributes.map((attr) => attr.title).join(", "),
      key: attributes.map((attr) => attr.title).join(" - "),
      _id: "",
      productId: "",
    }));

    setVariantOptions(filteredOptions);
    setFormData((prev) => ({
      ...prev,
      variantOptions: [...filteredOptions],
      variants,
    }));
  };

  // SUBMIT
  // SUBMIT FORM
  const onSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const slug = formData.slug || toSlug(formData.name);
      const content = handleGetContent();
      const payload = {
        ...formData,

        slug,
        description: content,
      };

      const res = await fetch(`${API_URL}/products${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save product");

      toast.success(`${id ? "Cập nhật" : "Tạo mới"} thành công`);
      navigate({ to: "/admin/products" });
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  let totalRating = 0;
  let totalCount = 0;
  formData.rating.forEach((item, index) => {
    totalRating += item * (index + 1);
    totalCount += item;
  });
  const averageRating = (totalCount > 0 ? totalRating / totalCount : 0).toFixed(
    1
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "App", href: "/admin" },
          { label: "Danh sách", href: "/admin/products" },
          { label: "Sản phẩm", isCurrent: true }, // Trang hiện tại không có href
        ]}
      />

      <div className="w-full mx-auto p-6 space-y-8 bg-background rounded-lg">
        <fieldset disabled={loading} className="grid w-full grid-cols-2 gap-8 ">
          <Card className="space-y-4 col-span-2 md:col-span-1  ">
            <CardContent className="space-y-4">
              <h3 className="font-bold text-xl">Thông tin</h3>

              <div>
                <label className="block text-sm font-medium text-accent-foreground mb-1">
                  Tên sản phẩm <span className="text-destructive">*</span>
                </label>
                <Input
                  aria-invalid={!!errors.name}
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>
              <div>
                {" "}
                <label className="block text-sm font-medium text-accent-foreground mb-1">
                  URL
                </label>
                <Input
                  aria-invalid={!!errors.slug}
                  name="slug"
                  placeholder="Ví dụ: product-name"
                  value={formData.slug}
                  onChange={handleChange}
                />
                {errors.slug && (
                  <p className="text-destructive text-sm">{errors.slug}</p>
                )}
              </div>
              <div>
                {" "}
                <label className="block text-sm font-medium text-accent-foreground mb-1">
                  Giới thiệu ngắn
                </label>
                <Textarea
                  aria-invalid={!!errors.introduction}
                  name="introduction"
                  placeholder=" "
                  value={formData.introduction}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      introduction: e.target.value,
                    }))
                  }
                />
                {errors.slug && (
                  <p className="text-destructive text-sm">
                    {errors.introduction}
                  </p>
                )}
              </div>
              <div>
                {" "}
                <label className="block text-sm font-medium text-accent-foreground mb-1">
                  Mô tả
                </label>
                <Editor ref={editorRef} initialContent={formData.description} />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Cover photo
                </label>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-4 ">
                  <div className="flex text-sm/6 ">
                    <label
                      htmlFor="files-upload"
                      className="relative cursor-pointer rounded-md font-semibold space-y-2  flex flex-col items-center justify-center"
                    >
                      <UploadIllustration hideBackground className="w-48" />

                      <p className="text-xs/5 ">
                        Định dạng PNG, JPG, JPEG, WEBP tối đa 2MB mỗi ảnh
                      </p>
                      <input
                        disabled={isUploading}
                        onChange={handleUploadImages}
                        id="files-upload"
                        name="images"
                        multiple
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 py-2 my-4 ">
                  {formData.images?.map((image, index) => (
                    <div
                      className="size-20 relative border border-border rounded-md"
                      key={index}
                    >
                      {" "}
                      <Image
                        src={image}
                        alt="cover"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <span
                        title="Xóa ảnh"
                        onClick={() => {
                          setFormData((prev) => {
                            const newImages = prev.images.filter(
                              (_, i) => i !== index
                            );
                            return { ...prev, images: newImages };
                          });
                        }}
                        className="cursor-pointer size-5 flex justify-center items-center absolute top-1 right-1 rounded-full bg-accent"
                      >
                        {" "}
                        <X strokeWidth={1} size={16} />
                      </span>
                      {index !== 0 && (
                        <span
                          onClick={() => {
                            setFormData((prev) => {
                              const images = [...prev.images];
                              const selected = images.splice(index, 1)[0];
                              return { ...prev, images: [selected, ...images] };
                            });
                          }}
                          className="cursor-pointer size-5 flex justify-center items-center absolute bottom-1 left-1 rounded-full bg-accent "
                          title="Đặt làm ảnh đại diện"
                        >
                          <ArrowUp strokeWidth={1} size={14} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className=" col-span-2 md:col-span-1">
            <CardContent className="space-y-4">
              <h3 className="font-bold text-xl">Thuộc tính biến thể</h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Thuộc tính</TableHead>
                    <TableHead>Giá trị</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variantOptions.map((option, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          placeholder="VD : Màu sắc"
                          value={option.name}
                          onChange={(e) => {
                            setVariantOptions((prev) => {
                              const newVariantOptions = [...prev];
                              newVariantOptions[index] = {
                                ...newVariantOptions[index],
                                name: e.target.value,
                                key: toSlug(e.target.value),
                              };
                              return newVariantOptions;
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <VariantOptionValuesInput
                            changeVariantOption={(values) => {
                              setVariantOptions((prev) => {
                                const newVariantOptions = [...prev];
                                newVariantOptions[index] = {
                                  ...newVariantOptions[index],
                                  values,
                                };
                                return newVariantOptions;
                              });
                            }}
                            values={option.values}
                          ></VariantOptionValuesInput>
                          <div className="flex space-x-0.5">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="shrink-0 rounded-r-none"
                                >
                                  <PencilLineIcon strokeWidth={1.25} />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="md:w-[600px] w-sm p-0">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Giá trị</TableHead>
                                      <TableHead>Giá</TableHead>
                                      <TableHead>Giá so sánh</TableHead>
                                      <TableHead>Màu sắc</TableHead>
                                      <TableHead>Hình ảnh</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>
                                        {option.values.map((item, i) => (
                                          <div key={i} className="flex gap-2">
                                            <Input
                                              value={item.value}
                                              onChange={(e) =>
                                                handleChangeVariantOptionValue(
                                                  "value",
                                                  e.target.value,
                                                  index,
                                                  i
                                                )
                                              }
                                            />
                                          </div>
                                        ))}
                                      </TableCell>
                                      <TableCell>
                                        {option.values.map((item, i) => (
                                          <div key={i} className="flex gap-2">
                                            <Input
                                              type="number"
                                              value={item.price}
                                              onChange={(e) =>
                                                handleChangeVariantOptionValue(
                                                  "price",
                                                  Number(e.target.value),
                                                  index,
                                                  i
                                                )
                                              }
                                            />
                                          </div>
                                        ))}
                                      </TableCell>
                                      <TableCell>
                                        {option.values.map((item, i) => (
                                          <div key={i} className="flex gap-2">
                                            <Input
                                              type="number"
                                              value={item.compareAtPrice}
                                              onChange={(e) =>
                                                handleChangeVariantOptionValue(
                                                  "compareAtPrice",
                                                  Number(e.target.value),
                                                  index,
                                                  i
                                                )
                                              }
                                            />
                                          </div>
                                        ))}
                                      </TableCell>
                                      <TableCell>
                                        {option.values.map((item, i) => (
                                          <div key={i} className="flex gap-2">
                                            <Input
                                              type="color"
                                              value={item.color}
                                              onChange={(e) =>
                                                handleChangeVariantOptionValue(
                                                  "color",
                                                  e.target.value,
                                                  index,
                                                  i
                                                )
                                              }
                                            />
                                          </div>
                                        ))}
                                      </TableCell>
                                      <TableCell>
                                        {option.values.map((item, i) => (
                                          <div key={i} className="flex gap-2">
                                            <label
                                              htmlFor={`variant-image-${index}-${i}`}
                                              className="cursor-pointer"
                                            >
                                              <Image
                                                width={32}
                                                height={32}
                                                src={item.image}
                                                alt="variant"
                                                className="size-8 object-cover rounded-md"
                                              />
                                              <input
                                                onChange={async (e) => {
                                                  const imgUpload =
                                                    (await uploadImg(e)) ?? "";
                                                  handleChangeVariantOptionValue(
                                                    "image",
                                                    imgUpload,
                                                    index,
                                                    i
                                                  );
                                                }}
                                                className="hidden"
                                                id={`variant-image-${index}-${i}`}
                                                type="file"
                                              />
                                            </label>
                                          </div>
                                        ))}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </PopoverContent>
                            </Popover>
                            <Button
                              variant="outline"
                              className="shrink-0 rounded-l-none"
                              onClick={() =>
                                setVariantOptions((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              size="icon"
                            >
                              <Trash2Icon strokeWidth={1.25} />
                            </Button>
                            <Select
                              onValueChange={(value) => {
                                setVariantOptions((prev) => {
                                  const newVariantOptions = [...prev];
                                  newVariantOptions[index] = {
                                    ...newVariantOptions[index],
                                    type: value,
                                  };
                                  return newVariantOptions;
                                });
                              }}
                              value={option.type}
                            >
                              <SelectTrigger className="w-28 ">
                                <SelectValue placeholder="Hiển thị" />
                              </SelectTrigger>
                              <SelectContent className="w-48">
                                <SelectItem value="button">Button</SelectItem>
                                <SelectItem value="color">Màu sắc</SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                                <SelectItem value="radio">Radio</SelectItem>
                                <SelectItem value="image">Hình ảnh</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() =>
                    setVariantOptions((prev) => [
                      ...prev,
                      { name: "", key: "", type: "button", values: [] },
                    ])
                  }
                >
                  <PlusIcon strokeWidth={1} className="mr-2" />
                  Thêm thuộc tính
                </Button>
              </div>
              <div className="flex justify-end">
                {variantOptions.length > 0 && (
                  <Button onClick={generateVariants}>Tạo biến thể </Button>
                )}
              </div>

              <h3 className="font-bold text-xl">Arrcordion</h3>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Tiêu đề
              </label>
              <Input
                value={formData.accordion}
                onChange={handleChange}
                name="accordion"
              />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Tiêu đề</TableHead>
                    <TableHead>Nội dung</TableHead>
                  </TableRow>
                </TableHeader>
                {formData.accordionItems?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          setFormData((prev) => {
                            const newAccordionItems = [
                              ...(prev.accordionItems || []),
                            ];
                            newAccordionItems[index] = {
                              ...newAccordionItems[index],
                              title: e.target.value,
                            };
                            return {
                              ...prev,
                              accordionItems: newAccordionItems,
                            };
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Textarea
                          value={item.value}
                          aria-invalid={
                            !!errors[`accordionItems.${index}.value`]
                          }
                          onChange={(e) => {
                            setFormData((prev) => {
                              const newAccordionItems = [
                                ...(prev.accordionItems || []),
                              ];
                              newAccordionItems[index] = {
                                ...newAccordionItems[index],
                                value: e.target.value,
                              };
                              return {
                                ...prev,
                                accordionItems: newAccordionItems,
                              };
                            });
                          }}
                        />
                        <Button
                          className="shrink-0"
                          variant="outline"
                          onClick={() =>
                            setFormData((prev) => {
                              const newAccordionItems = [
                                ...(prev.accordionItems || []),
                              ];
                              newAccordionItems.splice(index, 1);
                              return {
                                ...prev,
                                accordionItems: newAccordionItems,
                              };
                            })
                          }
                          size="icon"
                        >
                          <Trash2Icon strokeWidth={1.25} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      accordionItems: [
                        ...(prev.accordionItems || []),
                        { title: "", value: "" },
                      ],
                    }))
                  }
                >
                  <PlusIcon strokeWidth={1} className="mr-2" />
                  Thêm accordion
                </Button>
              </div>
              <h3 className="font-bold text-xl">Thông tin khác</h3>
              <div>
                {" "}
                <label className="block text-sm font-medium text-accent-foreground mb-1">
                  Bộ sưu tập
                </label>
                <Autocomplete
                  options={formData.collections}
                  setOptions={(options) =>
                    setFormData((prev) => ({ ...prev, collections: options }))
                  }
                  placeholder="Gõ và nhấn Enter để thêm giá trị VD: Mỹ phẩm"
                />
              </div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Đánh giá: <b>{totalCount}</b>; Trung bình:{" "}
                <b>{averageRating} </b>
              </label>
              <Table>
                <TableHeader>
                  <TableRow>
                    {Array.from({ length: 5 }, (_, index) => (
                      <TableHead key={index} className="w-32 text-center">
                        {index + 1} sao
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    {formData.rating.map((item, index) => (
                      <TableCell key={index}>
                        <Input
                          type="number"
                          className="h-7"
                          value={item}
                          onChange={(e) => {
                            const newRating = [...formData.rating];
                            newRating[index] = Number(e.target.value);
                            setFormData((prev) => ({
                              ...prev,
                              rating: newRating,
                            }));
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="col-span-2 ">
            <CardContent className="spaece-y-4">
              <h3 className="font-bold text-xl">Biến thể</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hình ảnh</TableHead>
                    <TableHead>Thuộc tính</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Giá so sánh</TableHead>
                    <TableHead>Kho hàng</TableHead>
                    <TableHead>SKU</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.variants.map((variant, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <label
                            htmlFor={`variant-image-${index}`}
                            className="cursor-pointer"
                          >
                            <Image
                              width={48}
                              height={48}
                              src={variant.image}
                              alt="variant"
                              className="w-10 h-10 object-cover rounded-md"
                            />
                            <input
                              onChange={(e) => handleUploadImage(e, index)}
                              className="hidden"
                              id={`variant-image-${index}`}
                              type="file"
                            />
                          </label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={variant.title}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "title",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={variant.compareAtPrice}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "compareAtPrice",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={variant.stock}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "stock",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={variant.sku}
                          onChange={(e) =>
                            handleVariantChange(index, "sku", e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </fieldset>
        <div className="flex justify-end">
          <Button onClick={onSubmit} disabled={loading} type="submit">
            {loading && <Loader2 strokeWidth={1.25} className="animate-spin" />}{" "}
            Lưu lại
          </Button>
        </div>
      </div>
    </div>
  );
}
