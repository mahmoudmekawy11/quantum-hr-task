import type { RootState } from "..";

export const userCredentialsSelector = (state: RootState) => state.auth;
export const usersSelector = (state: RootState) => state.users;   
export const userProfileInfoSelector = (state: RootState) => state.userProfile