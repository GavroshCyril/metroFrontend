import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    update: (state, action) => {
      // обновление состояния комментариев
      return action.payload;
    },
    deleteComment: (state, action) => {
      // удаление комментария из состояния
      const commentId = action.payload;
      return state.filter((comment) => comment.id_comments !== commentId);
    },
  },
});

export const { update, deleteComment } = commentsSlice.actions;

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;
