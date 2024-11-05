import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name:'userProfile',
    initialState:{
        userProfile:[]
    },
    reducers:{
        setUserProfile:(state,action) => {
            state.userProfile = action.payload
        },
    }

})

export const {setUserProfile} = userProfileSlice.actions
export default userProfileSlice.reducer