import { configureStore } from '@reduxjs/toolkit'
import ShortInfoReducer from "./short-slice"
import ABTagReducer from "./abtag-slice"
import userReducer from "./user"
import appReducer from "./app-slice"
import appAdminsReducer from "./app-admins-slice"
const store = configureStore({
    reducer: {
        shortInfo: ShortInfoReducer,
        abTag: ABTagReducer,
        user: userReducer,
        app: appReducer,
        appAdmins: appAdminsReducer
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch