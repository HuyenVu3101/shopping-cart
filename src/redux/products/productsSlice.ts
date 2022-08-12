import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialProducts, ProductDetail } from '~/models';

const initialState: InitialProducts = {
  productList: [],
  mainProduct: {} as any,
  loading: false,
};
const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    GET_LIST_PRODUCT_LOADING: (state, action: PayloadAction) => {
      state.loading = true;
    },
    GET_LIST_PRODUCT: (state, action: PayloadAction) => {
      state.loading = true;
    },
    GET_LIST_PRODUCT_SUCCESS: (state, action: PayloadAction<ProductDetail[]>) => {
      state.productList = action.payload;
      state.loading = false;
    },
    SET_ID_MAIN_PRODUCT: (state, action: PayloadAction<ProductDetail>) => {
      state.mainProduct = action.payload;
    },
  },
});

// Actions
export const productActions = productsSlice.actions;

// Reducer
const productReducer = productsSlice.reducer;
export default productReducer;
