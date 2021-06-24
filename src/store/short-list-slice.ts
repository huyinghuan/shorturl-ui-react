import { createSlice } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"


export const shortListSlice = createSlice({
    name: 'shortList',
    initialState: {
        list: [],
        loading: false,
        pager: {},
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
        emptyList: (state) => {
            state.list = []
            state.pager = {}
        }
    }
})
export const { emptyList, updateList, listLoading, listLoaded } = shortListSlice.actions;

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

export const loadOwnerList = (shortType: string, owner: string, page?: { page: number, pageSize?: number | undefined }) => {
    return async (dispatch: any) => {
        dispatch(listLoading())
        let params = page || {}
        API.get(`/api/short/${shortType}/list/${owner}`, { params: params }).then((response) => {
            const data = resultHandler(response)
            dispatch(updateList(data))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(listLoaded())
        })
    }
}



export default shortListSlice.reducer