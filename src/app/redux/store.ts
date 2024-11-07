import { configureStore } from '@reduxjs/toolkit'
import commentSlice  from './commentSlice'
import authSlice from './authSlice'
import postSlice from './postSlice'
import userProfileSlice from './userProfileSlice'
import updateAvatarSlice from './updateAvatarSlice'

export const store = configureStore({
  reducer:{
    auth:authSlice,
    post:postSlice,
    comment:commentSlice,
    userProfile:userProfileSlice,
    isClickedOnEditProfile:updateAvatarSlice,
  }
})
