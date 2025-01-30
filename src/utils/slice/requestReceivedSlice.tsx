import { createSlice } from "@reduxjs/toolkit";

const requestReceivedSlice = createSlice({
    name:"requestReceived",
    initialState : null,
    reducers:{
        addRequestReceived:(state, action)=>{
            return action.payload;
        },
        removeRequestReceived:(state,action)=>{
            const newArray = state.filter((r)=>r._id !== action.payload);
            return newArray;
        }
    },
});
export const {addRequestReceived,removeRequestReceived} = requestReceivedSlice.actions;
export default requestReceivedSlice.reducer;