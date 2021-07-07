import { createSlice } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"
import { load as loadTags } from "./abtag-slice"
export const shortSlice = createSlice({
    name: 'shortInfo',
    initialState: {
        info: {},
        newShort: "",
        loading: false,
        list: [],
        pager: {},
        doing: false
    },
    reducers: {
        set: (state, action) => {
            state.info = action.payload
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
        },
        doing: (state) => {
            if (state.doing === false) {
                state.doing = true
            }
        },
        did: (state) => {
            if (state.doing === true) {
                state.doing = false
            }
        },
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
        emptyList: (state) => {
            state.list = []
            state.pager = {}
        }
    }
})

const { set, loading, loaded, updateList, emptyList, doing, did } = shortSlice.actions;
export { emptyList }
export const load = (type: string, id: string) => {
    return async (dispatch: any) => {
        API.get(`/api/short/${type}/${id}`).then((response) => {
            dispatch(set(resultHandler(response)))
        }).catch((e) => {
            console.log(e)
        })
    }
}

// 更新短链
export const update = (type: string, id: string, values: any) => {
    return async (dispatch: any) => {
        API.put(`/api/short/${type}/${id}`, values).then((response) => {
            resultHandler(response, true)
            dispatch(load(type, id))
        }).catch((e) => {
            console.log(e)
        })
    }
}

// 生成短链
export const create = (url: string) => {
    return async (dispatch: any) => {
        API.post(`/api/short/u`, { url: url }).then((response) => {
            let short = resultHandler(response, true)
            short = short.split("/").pop()
            dispatch(search(short))
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const search = (keyword: string) => {
    return async (dispatch: any) => {
        dispatch(loading())
        API.get("/api/short/query/any", { params: { url: keyword } }).then((response) => {
            dispatch(updateList(resultHandler(response)))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(loaded())
        })
    }
}

export const loadOwnerList = (shortType: string, owner: string, page?: { page: number, pageSize?: number | undefined }) => {
    return async (dispatch: any) => {
        dispatch(loading())
        let params = page || {}
        API.get(`/api/short/${shortType}/list/${owner}`, { params: params }).then((response) => {
            const data = resultHandler(response)
            dispatch(updateList(data))
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(loaded())
        })
    }
}

export const deploy = (shortType: string, shortId: string) => {
    return async (dispatch: any) => {
        dispatch(doing())
        API.get(`/api/short/${shortType}/${shortId}/deploy`).then((response) => {
            resultHandler(response, true)
        }).catch((e) => {
            console.log(e)
        }).then(() => {
            dispatch(did())
            dispatch(loadTags(shortType, shortId))
        })
    }
}

export default shortSlice.reducer