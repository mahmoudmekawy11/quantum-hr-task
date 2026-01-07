import type { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface InitialState {

    users: User[];
    loadingUsers: boolean;
}
const initialState: InitialState = {
    users: [],
    loadingUsers: false,

}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
        },
        setLoadingUsers: (state, action: PayloadAction<boolean>) => {
            state.loadingUsers = action.payload;
        },
    },
});

export const { setUsers, clearUsers, setLoadingUsers } = usersSlice.actions;