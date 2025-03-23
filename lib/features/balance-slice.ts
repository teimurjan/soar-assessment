import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface BalanceData {
  date: string;
  balance: number;
}

interface BalanceState {
  history: BalanceData[];
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  history: [],
  loading: true,
  error: null,
};

export const fetchBalanceHistory = createAsyncThunk(
  'balance/fetchBalanceHistory',
  async () => {
    const response = await fetch('/api/balance-history');
    const data = await response.json();
    return data;
  }
);

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalanceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchBalanceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch balance history';
      });
  },
});

export default balanceSlice.reducer; 