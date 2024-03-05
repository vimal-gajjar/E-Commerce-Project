import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { filters: [], searchvalue: "", price: 0, categoryval: "" },
  reducers: {
    filter_by_search(state, action) {
      const { products, search } = action.payload;
      if (search !== "") {
        const filterProduct = products.filter((item) =>
          item.name.toLowerCase().includes(search)
        );
        state.filters = filterProduct;
      }
      state.searchvalue = search;
    },

    filter_by_category(state, action) {
      const { allProducts, category } = action.payload;

      if (category != "") {
        const filterProduct = allProducts.filter(
          (item) => item.category == category
        );
        state.filters = filterProduct;
      }
      state.categoryval = category;
    },

    filter_by_price(state, action) {
      const { allProducts, price } = action.payload;
      const filterProduct = allProducts.filter((product) => {
        return parseInt(product.price) <= parseInt(price);
      });
      if (filterProduct.length != 0) {
        state.filters = filterProduct;
        state.price = price;
      } else {
        state.filters = [];
        state.price = 0;
      }
    },
  },
});

export default filterSlice.reducer;
export const { filter_by_search, filter_by_category, filter_by_price } =
  filterSlice.actions;
export const selectFilter = (state) => state.filter.filters;
export const selectsearchvalue = (state) => state.filter.searchvalue;
export const selectprice = (state) => state.filter.price;
export const selectcategory = (state) => state.filter.categoryval;
