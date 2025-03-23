import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Card {
  id: string;
  type: 'dark' | 'light';
  balance: string;
  cardHolder: string;
  cardNumber: string;
  validThru: string;
}

interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  loading: true,
  error: null,
};

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async () => {
    const response = await fetch('/api/cards');
    const data = await response.json();
    return data;
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cards';
      });
  },
});

export default cardsSlice.reducer; 