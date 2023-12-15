import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice"
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
})

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types