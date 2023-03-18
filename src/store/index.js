import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLogIn: false },
    reducers: {
        login(state) {
            state.isLogIn = true
        },
        logout(state) {
            state.isLogIn = false
        },
    }
});

export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer
})