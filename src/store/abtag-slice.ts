import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"

export const abTagSlice = createSlice({
    name: 'abTag',
    initialState: {
        list: [],
        loading: false,
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
const { updateList, listLoading, listLoaded } = abTagSlice.actions;

export { listLoading, listLoaded }

export const create = (shortType: string, short: string, data: { url_desc: string, url: string, proportion: number }) => {
    return async (dispatch: any) => {
        API.post(`/api/short/${shortType}/${short}`, data).then((response) => {
            resultHandler(response, true)
            dispatch(loadList(shortType, short))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const update = (shortType: string, short: string, data: { url_desc: string, url: string, proportion: number }) => {
    return async (dispatch: Dispatch<any>) => {
        API.put(`/api/short/${shortType}/${short}`, data).then((response) => {
            resultHandler(response, true)
            dispatch(loadList(shortType, short))
        }).catch((e) => {
            console.log(e)
        })
    }
}



export const loadList = (shortType: string, short: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(listLoading())
        API.get(`/api/short/${shortType}/${short}`).then((response) => {
            const data = resultHandler(response)
            dispatch(updateList(data))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}



export default abTagSlice.reducer