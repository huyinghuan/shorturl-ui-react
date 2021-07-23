import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        list: [],
        loading: false,
        pager: {},
        searchParams: {},
        singleInfo: {},
    },
    reducers: {
        updateList: (state, action) => {
            const defaultPager = {
                index: 1,
                pageSize: 15,
                total: 1,
                pageTotal: 1
            }
            if (action.payload.data) {
                state.list = action.payload.data
                const pager = action.payload.page
                if (pager) {
                    state.pager = pager
                } else {
                    state.pager = defaultPager
                }
            } else {
                state.list = action.payload
                defaultPager.total = action.payload.length
                state.pager = defaultPager
            }
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
        },
        set: (state, action) => {
            state.singleInfo = action.payload
        }
    }
})
const { set, updateList, listLoading, listLoaded } = appSlice.actions;

export { listLoading, listLoaded }

export const create = (data: { app_name: string, allow_list: string }) => {
    return async (dispatch: any) => {
        API.post(`/api/token`, data).then((response) => {
            resultHandler(response, true)
            dispatch(loadList({}))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const update = (id: string, data: { app_name: string, allow_list: string }) => {
    return async (dispatch: Dispatch<any>) => {
        API.put(`/api/token/${id}`, data).then((response) => {
            resultHandler(response, true)
            dispatch(load(id))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const enableSingleTable = (id: string, is_single_table: boolean) => {
    return async (dispatch: Dispatch<any>) => {
        API.put(`/api/token/${id}/switch-single-table/${is_single_table ? "enable" : "disable"}`).then((response) => {
            resultHandler(response, true)
            dispatch(load(id))
        }).catch((e) => {
            console.log(e)
        })
    }
}

let searchParams = {}


export const loadList = (search: any, page?: { page: number, pageSize?: number | undefined }) => {
    return async (dispatch: Dispatch) => {
        dispatch(listLoading())
        if (!search) {
            search = searchParams
        } else {
            searchParams = search
        }
        let params = { ...search, ...page }
        API.get(`/api/token`, { params: params }).then((response) => {
            const data = resultHandler(response)
            dispatch(updateList(data))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}

export const load = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(listLoading())
        API.get(`/api/token/${id}`).then((response) => {
            const data = resultHandler(response)
            dispatch(set(data))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}


export default appSlice.reducer