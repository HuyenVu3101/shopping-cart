export interface ProductDetail {
  productId: string;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}
export interface InitialProducts {
  productList: ProductDetail[];
  mainProduct: ProductDetail;
  loading: boolean;
}
