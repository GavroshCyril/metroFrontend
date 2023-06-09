import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import localizationReducer from "./localizationSlice";
import linesReducer from "./linesSlice";
import reviewsReducer from "./reviewsSlice";
import commentsReducer from "./commentsSlice";
import newsReducer from "./newsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    localization: localizationReducer,
    lines: linesReducer,
    reviews: reviewsReducer,
    news: newsReducer,
    comments: commentsReducer,
  },
});
