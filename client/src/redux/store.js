import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import userReducer from "./slice/userSlice";
import categoryReducer from "./slice/categorySlice";
import productReducer from "./slice/productSlice";
import cardReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";
import recommendationReducer from "./slice/recommendationSlice";

const rootReducers = combineReducers({
  user: userReducer,
  category: categoryReducer,
  products: productReducer,
  car: cardReducer,
  wishlist: wishlistReducer,
  recommendation: recommendationReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);

export default store;
