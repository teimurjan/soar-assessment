import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface ExpensesState {
  categories: ExpenseCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  categories: [],
  loading: true,
  error: null,
};

export const fetchExpenseStats = createAsyncThunk(
  'expenses/fetchExpenseStats',
  async () => {
    const response = await fetch('/api/expense-stats');
    const data = await response.json();
    return data;
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseStats.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchExpenseStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch expense statistics';
      });
  },
});

export default expensesSlice.reducer; 