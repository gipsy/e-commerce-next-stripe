export interface Order {
  _id: string;
  name: string;
  email: string;
  qty: number;
  price: number;
  createdAt: string;
  paid: boolean;
  delivered: boolean;
  image: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
}

export interface CreateUserProps {
  name: string | null;
  email: string;
}

export interface CreateOrderProps {
  email: string;
  cart: Order[];
}

export interface AddToCartProps {
  product: Order;
  quantity: number;
}
