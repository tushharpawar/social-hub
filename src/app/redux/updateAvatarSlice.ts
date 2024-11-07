import { createSlice } from "@reduxjs/toolkit";

const updateAvatarSlice = createSlice({
    name:'updateAvatar',
    initialState:{
        isClickedOnEditProfile:false
    },
    reducers:{
        setIsClickedOnEditProfile:(state,action)=>{
            state.isClickedOnEditProfile = action.payload
        }
    }
})

export const {setIsClickedOnEditProfile} = updateAvatarSlice.actions
export default updateAvatarSlice.reducer