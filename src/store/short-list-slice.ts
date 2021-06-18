import { createSlice } from '@reduxjs/toolkit'
import { resultHandler } from "@src/service"
import axios from "axios"
export const shortListSlice = createSlice({
    name: 'shortList',
    initialState: {
        list: [],
        loading: false
    },
    reducers: {
        updateList: (state, action) => {
            state.list = action.payload
        },
        listLoading: (state) => {
            if (state.loading === false) {
                state.loading = true
            }
        },
        listLoaded: (state) => {
            if (state.loading === true) {
                state.loading = false
            }
        }
    }
})
export const { updateList, listLoading, listLoaded } = shortListSlice.actions;

export const search = (keyword: string) => {
    return async (dispatch: any) => {
        dispatch(listLoading())
        const response = await axios.get("/api/short/query/any", { params: { url: keyword } })
        dispatch(listLoaded())
        dispatch(updateList(resultHandler(response)))
    }
}

export default shortListSlice.reducer