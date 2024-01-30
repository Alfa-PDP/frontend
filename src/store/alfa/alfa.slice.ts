import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentYear = new Date().getFullYear();
interface YearState {
  year: number;
}

const initialState: YearState = {
  year: currentYear,
};

export const alfaSlice = createSlice({
  name: 'alfa',
  initialState,
  reducers: {
    setYear(state, action: PayloadAction<YearState>) {
      return { ...state, year: action.payload.year };
    },
  },
});

export const alfaActions = alfaSlice.actions;
export const alfaReducer = alfaSlice.reducer;
