import type { UserCredentials } from '@/types'
import { getTokenFromLocalStorage } from '@/utils.ts/localstorage-utils'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const savedToken = getTokenFromLocalStorage();
const validEmail = import.meta.env.VITE_VALID_EMAIL;
const validPassword = import.meta.env.VITE_VALID_PASSWORD;
const validToken = JSON.parse(import.meta.env.VITE_ACTIVE_TOKEN);


const initialState: UserCredentials = {
  email: savedToken ? validEmail : '',
  password: savedToken ? validPassword : '',
  access: savedToken || null,
  refresh: savedToken ? validToken.refresh : null,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserCredentials>) => {
      const { email, password, access, refresh } = action.payload
      state.email = email
      state.password = password
      state.access = access
      state.refresh = refresh
    },
    clearCredentials: (state) => {
      state.email = ''
      state.password = ''
      state.access = null
      state.refresh = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCredentials, clearCredentials } = authSlice.actions