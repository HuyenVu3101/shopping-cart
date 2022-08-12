import { CheckoutState, ProductDetail } from '~/models';
import axiosClient from './axiosClient';
import { Cart } from '~/models';
import { delay } from 'redux-saga/effects';
const productApi = {
  getAllProduct: (): Promise<ProductDetail[]> => {
    delay(3000);

    return axiosClient.get('/api/products');
  },
  payment: (data: Cart[]): Promise<CheckoutState> => {
    return axiosClient.post('/api/checkout', data);
  },
};
export default productApi;
