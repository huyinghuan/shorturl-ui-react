import { configureStore } from '@reduxjs/toolkit'
import ShortListReducer from "./short-list-slice"
import ShortInfoReducer from "./short-slice"
import ShortTagReducer from "./short-tag-slice"
import userReducer from "./user"
import appReducer from "./app-slice"
const store = configureStore({
    reducer: {
        shortList: ShortListReducer,
        shortInfo: ShortInfoReducer,
        shortTag: ShortTagReducer,
        user: userReducer,
        app: appReducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch