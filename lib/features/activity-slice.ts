import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ActivityData {
  date: string;
  income: number;
  expenses: number;
}

interface ActivityState {
  weeklyData: ActivityData[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  weeklyData: [],
  loading: true,
  error: null,
};

export const fetchWeeklyActivity = createAsyncThunk(
  'activity/fetchWeeklyActivity',
  async () => {
    const response = await fetch('/api/weekly-activity');
    const data = await response.json();
    return data;
  }
);

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyData = action.payload;
      })
      .addCase(fetchWeeklyActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weekly activity';
      });
  },
});

export default activitySlice.reducer; 