import {configureStore} from "@reduxjs/toolkit"
import logger from 'redux-logger';
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleWares = [];

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}).concat(middleWares),
})

export const persistor = persistStore(store)
