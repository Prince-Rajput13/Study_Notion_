import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}
const profileSlice = createSlice({
    name : "profile",
    initialState : initialState,
    reducer : {
        setToken(state,value){
            state.token = value.payload;
        }
    }
})
export const {setToken} = profileSlice.actions;
export default profileSlice.reducer;