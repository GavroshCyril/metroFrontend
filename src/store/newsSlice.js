import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    data: [],
  },
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
    },
  },
});

/* function selectedLine(elem, currentLineName) {
  return elem.line_name === currentLineName;
} */

export const selectNews = (state) => state.news.data;
export const selectNew = (state, currentNewName) => {
  return state.news.data.find((elem) => {
    return elem.news_title === currentNewName;
  });
};
export const selectCurrentNewName = (state) => state.news.currentNew;

export const { update, updateLocalisationResouces } = newsSlice.actions;

export default newsSlice.reducer;
