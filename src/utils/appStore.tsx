import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import feedReducer from "./slice/feedSlice";
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        // Add your reducers here
    }
});
export default appStore;