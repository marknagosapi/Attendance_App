// store/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './LoginSlice';
import registerReducer from './RegisterSlice'

const rootReducer = combineReducers({
  auth: loginReducer,
  register: registerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
