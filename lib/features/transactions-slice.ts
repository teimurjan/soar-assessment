import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  category: string;
}

interface TransferRequest {
  amount: number;
  description: string;
  category: string;
}

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: true,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    return data;
  }
);

export const createTransfer = createAsyncThunk(
  "transactions/createTransfer",
  async (transferData: TransferRequest) => {
    const response = await fetch("/api/transfers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transferData),
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return {
      ...data.data,
      type: "expense" as const,
    };
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      })
      .addCase(createTransfer.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
      });
  },
});

export default transactionsSlice.reducer;
