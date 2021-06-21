import { createSlice } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"
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
        API.get("/api/short/query/any", { params: { url: keyword } }).then((response) => {
            dispatch(updateList(resultHandler(response)))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}

export default shortListSlice.reducer