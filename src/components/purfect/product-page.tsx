import { useLoaderData } from "@tanstack/react-router";
import ProductDetailCarousel from "./views/product-carosel";

import { Heart, TruckIcon, Undo2Icon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerCustom,
} from "@/components/ui/accordion";

import ListPaymentMethod from "../list-payment-method";

import StarIcon from "../icons/star-icon";
import ReviewList from "../reviews";
import { AddToCartSection } from "./views/add-to-cart";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { IProduct, IVariant } from "@/types/product.type";

export default function ProductPage() {
  const productData = useLoaderData({
    from: "/products/$productId",
  });
  const slides = [...productData.images];
  for (let index = 0; index < productData.variants.length; index++) {
    const element = productData.variants[index];
    if (element.image) slides.push(element.image);
  }
  const [variant, setVariant] = useState<IVariant | null>(null);
  const product: IProduct = {
    ...productData,
    variants: productData.variants.map((variant: IVariant) => ({
      ...variant,
      image: variant.image || productData.image || productData.images[0] || "",
    })),
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 rounded-lg">
      <div className="grid grid-cols-12  gap-6">
        {/* Hình ảnh */}
        <div className="col-span-12 md:col-span-7 ">
          <ProductDetailCarousel slides={slides} />
        </div>

        {/* Nội dung */}
        <div className="flex md:pl-4 lg:pl-8 flex-col col-span-12 md:col-span-5 space-y-4">
          <h2 className="text-2xl md:text-3xl  font-bold text-accent-foreground">
            {product.name}
            <span className="bg-destructive rounded-md text-white text-sm mx-2 p-1 align-top font-semibold">
              Today Only!
            </span>
          </h2>
          <div className="flex items-center justify-start space-x-2 text-gray-600  text-lg">
            <span className="flex space-x-1 text-yellow-400 text-lg mr-2">
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
            </span>
            <span className="text-accent-foreground text-sm font-semibold">
              4.9 <span className="text-gray-500">(12k)</span>
            </span>
          </div>
          <div className="space-y-2 rounded-lg">
            <p className="text-4xl flex space-x-2 ">
              <span className="font-normal ">
                {" "}
                {formatCurrency(variant?.price || 0)}
              </span>
              <span className="line-through  ">
                {!!variant?.compareAtPrice &&
                  formatCurrency(variant.compareAtPrice)}
              </span>{" "}
            </p>
            <p className="text-gray-500 text-sm">
              Inclusive of all taxes. Shipping calculated at checkout.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="line-clamp-3">{product.introduction}</p>
          </div>
          <div className="mt-6">
            <AddToCartSection
              variant={variant}
              setVariant={setVariant}
              product={product}
            />
          </div>

          <div className="mx-2 flex items-center space-x-4 md:space-x-8 text-accent-foreground font-semibold    justify-around sm:text-sm">
            <span className="flex items-center space-y-2 flex-col  justify-center text-center">
              <Heart strokeWidth={1.5} size={30} />
              <span>Customer Favorite</span>
            </span>
            <span className="flex items-center space-y-2 flex-col justify-center text-center">
              <Undo2Icon strokeWidth={1.5} size={30} />
              <span>Money-back Guarantee</span>
            </span>
            <span className="flex items-center space-y-2 flex-col  justify-center text-center">
              <TruckIcon strokeWidth={1.5} size={30} />
              <span>Fast Shipping</span>
            </span>
          </div>
          <ListPaymentMethod />
          <div>
            <Accordion type="single" collapsible className="w-full">
              {product.accordionItems?.map((item, index) => (
                <AccordionItem key={item.title} value={`item-${index}`}>
                  <AccordionTriggerCustom>{item.title}</AccordionTriggerCustom>
                  <AccordionContent>{item.value}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      {!!productData.description && (
        <div>
          <h3 className="text-2xl my-4 text-gray-500 font-semibold">
            Product detail
          </h3>
          <div
            className="tiptap"
            dangerouslySetInnerHTML={{ __html: productData.description }}
          ></div>
        </div>
      )}
      <div className="col-span-2">
        {" "}
        <ReviewList slug={productData.slug} />
      </div>
    </div>
  );
}
