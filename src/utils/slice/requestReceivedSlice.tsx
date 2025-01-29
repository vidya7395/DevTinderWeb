import { createSlice } from "@reduxjs/toolkit";

const requestReceivedSlice = createSlice({
    name:"requestReceived",
    initialState : null,
    reducers:{
        addRequestReceived:(state, action)=>{
            return action.payload;
        },
        removeRequestReceived:()=>{
            return null;
        }
    },
});
export const {addRequestReceived,removeRequestReceived} = requestReceivedSlice.actions;
export default requestReceivedSlice.reducer;