import { createSlice } from '@reduxjs/toolkit'
import { resultHandler } from "@src/service"
import axios from "axios"
export const shortSlice = createSlice({
    name: 'shortInfo',
    initialState: {
        info: {},
        loading: false
    },
    reducers: {
        update: (state, action) => {
            state.info = action.payload
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

const { update, listLoading, listLoaded } = shortSlice.actions;

export const loadInfo = (type: string, id: string) => {
    return async (dispatch: any) => {
        dispatch(listLoading())
        const response = await axios.get(`/api/short/${type}/${id}`)
        dispatch(listLoaded())
        dispatch(update(resultHandler(response)))
    }
}

export default shortSlice.reducer