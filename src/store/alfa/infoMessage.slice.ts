import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoMessageState {
  visible: boolean;
  badge: 'negative' | 'positive' | 'attention' | undefined;
  title: string;
}

const initialState: InfoMessageState = {
  visible: false,
  badge: undefined,
  title: '',
};

export const infoMessageSlice = createSlice({
  name: 'infoMessage',
  initialState,
  reducers: {
    setInfoMessage(state, action: PayloadAction<InfoMessageState>) {
      return {
        ...state,
        title: action.payload.title,
        badge: action.payload.badge,
        visible: action.payload.visible,
      };
    },
    setVisibleFalse(state) {
      return {
        ...state,
        visible: false,
      };
    },
  },
});

export const infoMessageActions = infoMessageSlice.actions;
export const infoMessageReducer = infoMessageSlice.reducer;
