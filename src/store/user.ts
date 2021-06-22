import { createSlice } from '@reduxjs/toolkit'
import { resultHandler, API } from "@src/service"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        info: {},
    },
    reducers: {
        set: (state, action) => {
            state.info = action.payload
        }
    }
})

const { set } = userSlice.actions;

export const load = () => {
    return async (dispatch: any) => {
        API.get(`/api/user`).then((response) => {
            dispatch(set(resultHandler(response)))
        }).catch((e) => {
            console.log(e)
        })
    }
}


export default userSlice.reducer