import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentYear = new Date().getFullYear();
interface YearState {
  year: number;
}

const initialState: YearState = {
  year: currentYear,
};

export const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setYear(state, action: PayloadAction<YearState>) {
      return { ...state, year: action.payload.year };
    },
  },
});

export const yearActions = yearSlice.actions;
export const yearReducer = yearSlice.reducer;
