import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catIndex: 0,
  sortIndex: 0,
  totalPage: 0,
  currentPage: 1,
  limit: 0
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCatIndex: (state, action) => {
      state.catIndex = action.payload;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setLocationProp: (state, action) => {
      state.catIndex = action.payload.catIndex;
      state.sortIndex = action.payload.sortIndex;
      state.currentPage = action.payload.currentPage;
      state.limit = action.payload.limit;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCatIndex, setSortIndex, setTotalPage, setCurrentPage, setLimit, setSearchValue,setLocationProp } = filterSlice.actions;

export default filterSlice.reducer;
