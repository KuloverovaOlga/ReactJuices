import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unique: window.location.href.slice(window.location.href.lastIndexOf('juice')),
  currentProduct: JSON.parse(localStorage.getItem('currentProduct')) || {}
};

export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState,
  reducers: {
    setUnique: (state, action) => {
      state.unique = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUnique, setCurrentProduct } = currentProductSlice.actions;

export default currentProductSlice.reducer;
