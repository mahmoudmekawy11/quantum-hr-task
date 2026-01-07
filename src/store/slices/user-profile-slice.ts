import type { UserCredentials, UserProfileInfo } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState: UserProfileInfo = {
    name: 'Mahmoud Mekawy Khalifa',
    phone: '+201120348190',
    jobTitle: 'Front-end Developer',
    yearsOfExperience: 4,
    address: 'Giza, Egypt',
    workingHours: 3,
}


export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserProfileInfo: (state, action: PayloadAction<UserProfileInfo>) => {
            return { ...state, ...action.payload }
        },
        clearUserProfileInfo: () => {
            return initialState
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserProfileInfo, clearUserProfileInfo } = userProfileSlice.actions