import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { filters: [] },
  reducers: {
    filter_by_search(state, action) {
      const { products, search } = action.payload;
      if (search !== "") {
        const filterProduct = products.filter((item) =>
          item.name.toLowerCase().includes(search)
        );
        state.filters = filterProduct;
      } else {
        state.filters = [];
      }
    },

    filter_by_category(state, action) {
      const { allProducts, category } = action.payload;
      const filterProduct = allProducts.filter(
        (item) => item.category == category
      );
      state.filters = filterProduct;
    },

    filter_by_price(state, action) {
      const { allProducts, price } = action.payload;
      const filterProduct = allProducts.filter((product) => {
        const productPrice = Number(product.price);
        return productPrice <= Number(price);
      });
      if (filterProduct.length != 0) {
        state.filters = filterProduct;
      } else {
        state.filters = [];
      }
    },
  },
});

export default filterSlice.reducer;
export const { filter_by_search, filter_by_category, filter_by_price } =
  filterSlice.actions;
export const selectFilter = (state) => state.filter.filters;
