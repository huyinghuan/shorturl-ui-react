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

export const create = (idRaw: string, data: { url_desc: string, url: string, proportion: number }) => {
    return async (dispatch: any) => {
        API.post(`/api/short/short-raw/${idRaw}/tag`, data).then((response) => {
            resultHandler(response, true)
            dispatch(load(idRaw))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const update = (idRaw: string, data: { url_desc: string, url: string, proportion: number }) => {
    return async (dispatch: Dispatch<any>) => {
        API.put(`/api/short/short-raw/${idRaw}/tag`, data).then((response) => {
            resultHandler(response, true)
            dispatch(load(idRaw))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const deleteTag = (idRaw: string, tagId: number) => {
    return async (dispatch: Dispatch<any>) => {
        API.delete(`/api/short/short-raw/${idRaw}/tag/${tagId}`).then((response) => {
            resultHandler(response, true)
            dispatch(load(idRaw))
        }).catch((e) => {
            console.log(e)
        })
    }
}


export const load = (idRaw: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading())
        API.get(`/api/short/short-raw/${idRaw}/tag`).then((response) => {
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