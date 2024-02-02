import { configureStore } from '@reduxjs/toolkit';
import { api } from './alfa/alfa.api';
import { yearReducer } from './alfa/year.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    year: yearReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
