import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, InitialCart, Payment } from '~/models';

const initialState: InitialCart = {
  allPrice: 0,
  cart: [],
  checkout: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    CHECKOUT: (state, action: PayloadAction<Payment>) => {
      state.checkout = true;
    },
    SET_CART: (state, action: PayloadAction<Cart>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.productId === newItem.productId);
      existingItem
        ? (existingItem.amount += newItem.amount) && (existingItem.allPrice += newItem.allPrice)
        : state.cart.push(action.payload);
    },
    SET_DELETE_CART: (state, action: PayloadAction<Cart[]>) => {
      state.cart = action.payload;
    },
    SET_ITEM_CART_MINUS: (state, action: PayloadAction<Cart>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.productId === newItem.productId);
      existingItem && existingItem.amount > 1 && existingItem.amount-- && (existingItem.allPrice -= existingItem.price);
    },
    SET_ITEM_CART_PLUS: (state, action: PayloadAction<Cart>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.productId === newItem.productId);
      existingItem && existingItem.amount++ && (existingItem.allPrice += existingItem.price);
    },
    RESET_CHECKOUT: (state) => {
      state.cart = [];
      state.checkout = false;
    },
  },
});

// Actions
export const cartActions = cartSlice.actions;

// Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
