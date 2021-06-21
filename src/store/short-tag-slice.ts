import { createSlice } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"
export const shortTagSlice = createSlice({
    name: 'shortTagList',
    initialState: {
        list: [],
        loading: false
    },
    reducers: {
        set: (state, action) => {
            state.list = action.payload
        },
        loading: (state) => {
            if (state.loading === false) {
                state.loading = true
            }
        },
        loaded: (state) => {
            if (state.loading === true) {
                state.loading = false
            }
        }
    }
})
export const { set, loading, loaded } = shortTagSlice.actions;

export const search = (keyword: string) => {
    return async (dispatch: any) => {
        dispatch(loading())
        API.get("/api/short/query/any", { params: { url: keyword } }).then((response) => {
            dispatch(set(resultHandler(response)))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(loaded())
        })
    }
}

export default shortTagSlice.reducer