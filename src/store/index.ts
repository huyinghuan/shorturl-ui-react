import { configureStore } from '@reduxjs/toolkit'
import ShortListReducer from "./short-list-slice"
import ShortInfoReducer from "./short-slice"

const store = configureStore({
    reducer: {
        shortList: ShortListReducer,
        shortInfo: ShortInfoReducer
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch