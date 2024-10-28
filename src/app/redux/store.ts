import { combineReducers, configureStore } from '@reduxjs/toolkit'
import commentSlice  from './commentSlice'
import authSlice from './authSlice'

// import {
//   persistReducer,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage
// }

// const rootReducer = combineReducers({
//   auth:authSlice
// // })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:{
    auth:authSlice
  }
})
