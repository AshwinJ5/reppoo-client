import { configureStore } from "@reduxjs/toolkit";
import faqReducer from "./faqSlice";
import featureReducer from "./featureSlice";
import testimonialReducer from "./testimonialSlice";

export const store = configureStore({
  reducer: {
    faq: faqReducer,
    feature: featureReducer,
    testimonial: testimonialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
