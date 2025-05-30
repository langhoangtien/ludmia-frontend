export type IOrder = {
  _id: string;
  email: string;
  name: string;
  status: string;
  paymentMethod: string;
  paymentId?: string;
  paymentSource?: PaymentSourceResponse;
  total: number;
  tax: number;
  paymentGateway?: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  products: IVariantCart[];
  logisticPartner?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
};

export type IVariantCart = {
  title: string;
  productId: string;
  variantId: string;
  name: string;
  quantity: number;
  price: number;
  _id?: string;
};
export type CardResponse = {
  name?: string;
  last_digits?: string;
  brand?: string;
  available_networks?: string[];
  type?: string;
  expiry?: string;
  bin_details?: {
    bin?: string;
    issuing_bank?: string;
    bin_country_code?: string;
  };
};

export type PaypalWalletResponse = {
  email_address?: string;
  account_id?: string;
  account_status?: string;
  name?: {
    given_name?: string;
    surname?: string;
  };

  businessName?: string;

  address?: {
    address_line1?: string;
    address_line2?: string;
    admin_area2?: string;
    admin_area1?: string;
    postal_code?: string;
  };
};
export type PaymentSourceResponse = {
  card?: CardResponse;
  paypal?: PaypalWalletResponse;
};
