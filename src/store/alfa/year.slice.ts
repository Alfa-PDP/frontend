import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentYear = new Date().getFullYear();
interface YearState {
  filteredYear: string | undefined;
}

const initialState: YearState = {
  filteredYear: currentYear.toString(),
};

export const yearSlice = createSlice({
  name: 'filteredYear',
  initialState,
  reducers: {
    setYear(state, action: PayloadAction<YearState>) {
      return { ...state, filteredYear: action.payload.filteredYear };
    },
  },
});

export const yearActions = yearSlice.actions;
export const yearReducer = yearSlice.reducer;
