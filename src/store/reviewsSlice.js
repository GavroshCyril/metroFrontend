import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    data: [],
  },
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
    },
    updateReviews: (state, action) => {
      // Обновляем состояние отзывов
      state.data = action.payload;
    },
  },
});

export const selectReviews = (state) => state.reviews.data;

export const { update, updateReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;
