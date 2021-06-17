import { createSlice } from '@reduxjs/toolkit'
import { resultHandler } from "@src/service"
import axios from "axios"
export const counterSlice = createSlice({
    name: 'shortList',
    initialState: {
        value: []
    },
    reducers: {
        updateList: (state, action) => {
            console.log(action.payload)
            state.value = action.payload
        }
    }
})
export const { updateList } = counterSlice.actions;

export const search = (keyword: string) => {
    return async (dispatch: any) => {
        const response = await axios.get("/api/short/query/any", { params: { url: keyword } })
        dispatch(resultHandler(response))
    }
}

export default counterSlice.reducer