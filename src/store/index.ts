import { configureStore } from '@reduxjs/toolkit';
import { api } from './alfa/alfa.api';
import { yearReducer } from './alfa/year.slice';
import { userReducer } from './alfa/user.slice';
import { infoMessageReducer } from './alfa/infoMessage.slice';
import { goalsReducer } from './alfa/goals.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filteredYear: yearReducer,
    user: userReducer,
    infoMessage: infoMessageReducer,
    goals: goalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
