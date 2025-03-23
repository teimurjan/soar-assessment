import { configureStore } from "@reduxjs/toolkit";

import activityReducer from "./features/activity-slice";
import balanceReducer from "./features/balance-slice";
import cardsReducer from "./features/cards-slice";
import contactsReducer from "./features/contacts-slice";
import expensesReducer from "./features/expenses-slice";
import transactionsReducer from "./features/transactions-slice";
import userReducer from "./features/user-slice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    transactions: transactionsReducer,
    activity: activityReducer,
    expenses: expensesReducer,
    balance: balanceReducer,
    contacts: contactsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
