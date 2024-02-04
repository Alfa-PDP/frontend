import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GoalsState {
  id: string;
  user_id: string;
  goal_name: string;
  employee_side_plus: string;
  employee_side_minus: string;
}

const initialState: GoalsState = {
  id: '',
  user_id: '',
  goal_name: '',
  employee_side_plus: '',
  employee_side_minus: '',
};

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setGoals: (_, action: PayloadAction<GoalsState>) => {
      return action.payload;
    },
  },
});

export const goalsActions = goalsSlice.actions;
export const goalsReducer = goalsSlice.reducer;
