import { combineReducers } from "redux";
import {cartReducer} from "./cart/cart.reducer" 
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";




export const rootReducer = combineReducers({
    cart : cartReducer,
});
