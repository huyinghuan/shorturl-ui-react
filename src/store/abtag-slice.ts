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
            state.list = action.payload || []
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
const { updateList, loading, loaded } = abTagSlice.actions;

export { loading, loaded }

export const create = (shortType: string, short: string, data: { url_desc: string, url: string, proportion: number }) => {
    return async (dispatch: any) => {
        API.post(`/api/short/${shortType}/${short}/tag`, data).then((response) => {
            resultHandler(response, true)
            dispatch(load(shortType, short))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const update = (shortType: string, short: string, data: { url_desc: string, url: string, proportion: number }) => {
    return async (dispatch: Dispatch<any>) => {
        API.put(`/api/short/${shortType}/${short}/tag`, data).then((response) => {
            resultHandler(response, true)
            dispatch(load(shortType, short))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const deleteTag = (shortType: string, short: string, tagId: number) => {
    return async (dispatch: Dispatch<any>) => {
        API.delete(`/api/short/${shortType}/${short}/tag/${tagId}`).then((response) => {
            resultHandler(response, true)
            dispatch(load(shortType, short))
        }).catch((e) => {
            console.log(e)
        })
    }
}


export const load = (shortType: string, short: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading())
        API.get(`/api/short/${shortType}/${short}/tag`).then((response) => {
            const data = resultHandler(response)
            dispatch(updateList(data))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(loaded())
        })
    }
}



export default abTagSlice.reducer