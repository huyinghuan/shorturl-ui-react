import { createSlice } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"

import { search } from "@store/short-list-slice"
export const shortSlice = createSlice({
    name: 'shortInfo',
    initialState: {
        info: {},
        newShort: "",
        loading: false
    },
    reducers: {
        set: (state, action) => {
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

const { set, listLoading, listLoaded } = shortSlice.actions;

export const load = (type: string, id: string) => {
    return async (dispatch: any) => {
        dispatch(listLoading())
        API.get(`/api/short/${type}/${id}`).then((response) => {
            dispatch(set(resultHandler(response)))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}

// 更新短链
export const update = (type: string, id: string, values: any) => {
    return async (dispatch: any) => {
        dispatch(listLoading())
        API.put(`/api/short/${type}/${id}`, values).then((response) => {
            resultHandler(response, true)
            dispatch(load(type, id))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}

// 生成短链
export const create = (url: string) => {
    return async (dispatch: any) => {
        dispatch(listLoading())
        API.post(`/api/short/u`, { url: url }).then((response) => {
            let short = resultHandler(response, true)
            console.log(short)
            short = short.split("/").pop()
            console.log(short)
            dispatch(search(short))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}

export default shortSlice.reducer