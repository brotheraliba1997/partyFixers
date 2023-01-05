import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
// {
// userData: [],
// }

const userReducer = createSlice({
    name: 'user',
    initialState: { initialState },
    reducers: {
        loginUser: (state, payload) => {
            state.initialState = payload;
        },
    },
});

export default userReducer.reducer;
export const { loginUser } = userReducer.actions;