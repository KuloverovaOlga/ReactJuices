import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalPrice: 0,
  totalItems: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // setCartItems: (state, action) => {
    //   state.cartItems.push(action.payload);
    // },

    setCartItems: (state, action) => {
      const keys = ['unique', 'sizesIndex', 'typesIndex'];
      const existingItem = state.cartItems.find((item) => keys.every((key) => item[key] === action.payload[key]));

      if (existingItem) {
        existingItem.itemCount += 1; // если уже есть — увеличиваем
      } else {
        state.cartItems.push({ ...action.payload, itemCount: 1 });
      }
    },
    removeAllCartItems: (state, action) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
    removeCartItems: (state, action) => {
      const keys = ['unique', 'sizesIndex', 'typesIndex'];
      state.cartItems = state.cartItems.filter((item) => !keys.every((key) => item[key] === action.payload[key]));
    },

    setTotalHeaderInfo: (state, action) => {
      state.totalPrice = state.cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.checkedPrice * currentValue.itemCount,
        0
      );
      state.totalItems = state.cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.itemCount, 0);
    },
    increaseCartItem: (state, action) => {
      const keys = ['unique', 'sizesIndex', 'typesIndex'];
      const item = state.cartItems.find((i) => keys.every((key) => i[key] === action.payload[key]));
      if (item) {
        item.itemCount += 1;
      }
    },

    decreaseCartItem: (state, action) => {
      const keys = ['unique', 'sizesIndex', 'typesIndex'];
      const item = state.cartItems.find((i) => keys.every((key) => i[key] === action.payload[key]));
      if (item && item.itemCount > 1) {
        item.itemCount -= 1;
      } else {
        state.cartItems = state.cartItems.filter((filterItem) => filterItem !== item);
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCartItems, removeAllCartItems, removeCartItems, setTotalHeaderInfo, increaseCartItem, decreaseCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
