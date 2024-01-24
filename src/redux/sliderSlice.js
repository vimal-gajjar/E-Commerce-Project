import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: { sliders: [] },
  reducers: {
    Add_slider(state, action) {
      state.sliders = action.payload;
    },
  },
});

export default sliderSlice.reducer;
export const { Add_slider } = sliderSlice.actions;
export const selectslider = (state) => state.slider.sliders;
