import { ProductDetail } from './products';

export interface Cart extends ProductDetail {
  amount: number;
  allPrice: number;
}
export interface InitialCart {
  cart: Cart[];
  allPrice: number;
  checkout: boolean;
}
export interface CheckoutState {
  success: boolean;
}
export interface ProductsInOrder {
  productId: string;
  quantity: number;
}
export interface Payment {
  paySuccess: boolean;
  productsInOrder: ProductsInOrder[];
}
