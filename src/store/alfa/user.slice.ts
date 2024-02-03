import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleState {
  role: string;
}

const initialState: RoleState = {
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<RoleState>) {
      return { ...state, role: action.payload.role };
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
