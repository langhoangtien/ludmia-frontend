export type IVariant = {
  productId: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  attributes: IVariantAttribute[];
  title: string;
  image: string;
  sku?: string;
  _id: string;
};

export type IVariantAttribute = {
  name: string;
  title: string;
};
export type IVariantOption = {
  type: string;
  name: string;
  key: string;
  values: IVariantOptionValue[];
};

export type IVariantOptionValue = {
  title: string;
  value: string;
  price: number;
  compareAtPrice: number;
  image: string;
  color: string;
};
export type IProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  introduction?: string;
  minPrice: number;
  minCompareAtPrice: number;
  collections: {
    title: string;
    value: string;
  }[];
  image: string;
  images: string[];
  variantOptions: IVariantOption[];
  createdAt?: string;
  variants: IVariant[];
  accordion?: string;
  accordionItems?: { title: string; value: string }[];
  averageRating: number;
  rating: number[];
};
