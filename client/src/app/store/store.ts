import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import counterSlice from "./feature/counterSlice";
import userSlice from "./feature/userSlice";
import departmenSlice from "./feature/adminSlice";
import candidateSlice from "./feature/candidateSlice";
import educationSlice from "./feature/educationSlice";
import tranningSlice from "./feature/tranningSlice";
import authSlice from "./feature/authSlice";
import adminSlice from "./feature/adminSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    users: userSlice,
    department: departmenSlice,
    candidate: candidateSlice,
    education: educationSlice,
    tranning: tranningSlice,
    auth: authSlice,
    admin: adminSlice,
  },

  // middleware: [thunk],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
