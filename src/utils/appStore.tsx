import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
const appStore = configureStore({
    reducer: {
        user: userReducer,
        // Add your reducers here
    }
});
export default appStore;