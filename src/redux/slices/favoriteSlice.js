import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteItems: JSON.parse(localStorage.getItem('favoriteItems')) || [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    // setfavoriteItems: (state, action) => {
    //   state.favoriteItems.push(action.payload);
    // },

    toggleFavoriteItems: (state, action) => {
      const existingItem = state.favoriteItems.find((item) => item.unique === action.payload.unique);

      if (existingItem) {
        state.favoriteItems = state.favoriteItems.filter((item) => item.unique !== action.payload.unique);
      } else {
        state.favoriteItems.push({ ...action.payload });
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleFavoriteItems } = favoriteSlice.actions;

export default favoriteSlice.reducer;
