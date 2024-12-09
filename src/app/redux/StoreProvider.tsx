'use client'

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "./store";

export const StoreProvider = ({children}:{children:ReactNode}) =>{
    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    )
}
