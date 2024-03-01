import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setProductsState: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    deleteProduct: (state, action) => {
      const pid = action.payload;

      const newProducts = state.products.filter((p) => p.id != pid);
      state.products = [...newProducts];
    },
    updatePrduct: (state, action) => {
      state.products = state.products.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
  },
});

export const { setProductsState, addProduct, deleteProduct, updatePrduct } =
  productSlice.actions;

export default productSlice.reducer;
