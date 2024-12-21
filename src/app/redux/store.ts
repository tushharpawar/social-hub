import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import commentSlice  from './commentSlice'
import authSlice from './authSlice'
import postSlice from './postSlice'
import userProfileSlice from './userProfileSlice'
import updateAvatarSlice from './updateAvatarSlice'
import themeSlice from './themeSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    post:postSlice,
    comment:commentSlice,
    userProfile:userProfileSlice,
    isClickedOnEditProfile:updateAvatarSlice,
    theme:themeSlice,
},
})