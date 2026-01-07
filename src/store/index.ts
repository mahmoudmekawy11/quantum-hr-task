import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth-slice'
import { usersSlice } from './slices/users-slice'
import { userProfileSlice } from './slices/user-profile-slice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    userProfile: userProfileSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch