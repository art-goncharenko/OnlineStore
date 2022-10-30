import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import {apiSlice} from "../features/api/apiSlice";
import {productReducer} from "../features/products/productSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer

  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
