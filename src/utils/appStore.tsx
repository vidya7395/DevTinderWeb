import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import feedReducer from "./slice/feedSlice";
import connectionReducer from"./slice/connectionSlice";
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection:connectionReducer
        // Add your reducers here
    }
});
export default appStore;