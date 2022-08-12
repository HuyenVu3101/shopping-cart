import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import productApi from '~/api/productApi';
import { Cart, CheckoutState } from '~/models';
import { cartActions } from './cartSlice';

function* handleCheckout(action: PayloadAction<Cart[]>) {
  try {
    const response: CheckoutState = yield call(productApi.payment, action.payload);

    if (response.success) {
      yield put(cartActions.RESET_CHECKOUT());
    }
  } catch (error) {
    console.log('error ', error);
  }
}

export default function* cartSaga() {
  yield takeLatest(cartActions.CHECKOUT.type, handleCheckout);
}
