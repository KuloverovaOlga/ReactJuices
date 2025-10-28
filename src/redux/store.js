import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';
import currentProductReducer from './slices/currentProductSlice';
import SearchReducer from './slices/searchSlice';
import CartReducer from './slices/cartSlice';
import FavoriteReducer from './slices/favoriteSlice';

import { setTotalHeaderInfo } from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    current: currentProductReducer,
    search: SearchReducer,
    cart: CartReducer,
    favorite: FavoriteReducer
  }
});
store.dispatch(setTotalHeaderInfo());
// сохраняем при каждом изменении cart
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
  localStorage.setItem('favoriteItems', JSON.stringify(state.favorite.favoriteItems));
});

export default store;
