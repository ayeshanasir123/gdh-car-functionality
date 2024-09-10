"use client";

import { createSlice } from "@reduxjs/toolkit";

interface IAccessoriesSearchForm {
  category: string;
  product: string;
}

const accessoriesSearchFormInitialState: IAccessoriesSearchForm = {
  category: "",
  product: "",
};

const accessoriesSearchFormSlice = createSlice({
  name: "accessories-search-form",
  initialState: accessoriesSearchFormInitialState,
  reducers: {
    category: (state, action) => {
      state.category = action.payload;
    },
    product: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { category, product } = accessoriesSearchFormSlice.actions;

export default accessoriesSearchFormSlice.reducer;
