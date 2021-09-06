import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"

export const appAdminsSlice = createSlice({
    name: 'appAdminsSlice',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {
        updateList: (state, action) => {
            console.log(action.payload)
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
const { updateList, loading, loaded } = appAdminsSlice.actions;

export { loading, loaded }

export const create = (idRaw: string, data: { username: string }) => {
    return async (dispatch: any) => {
        API.post(`/api/token/${idRaw}/admins`, data).then((response) => {
            resultHandler(response, true)
            dispatch(load(idRaw))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const deleteItem = (idRaw: string, adminId: number) => {
    return async (dispatch: Dispatch<any>) => {
        API.delete(`/api/token/${idRaw}/admins/${adminId}`).then((response) => {
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
        API.get(`/api/token/${idRaw}/admins`).then((response) => {
            const data = resultHandler(response)
            dispatch(updateList(data))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(loaded())
        })
    }
}



export default appAdminsSlice.reducer