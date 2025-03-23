import { faker } from "@faker-js/faker";

import type { ActivityData } from "./features/activity-slice";
import type { BalanceData } from "./features/balance-slice";
import type { Card } from "./features/cards-slice";
import type { ExpenseCategory } from "./features/expenses-slice";
import type { Transaction } from "./features/transactions-slice";
import type { User } from "./features/user-slice";

export const generateCards = (count: number = 2): Card[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    type: index % 2 === 0 ? "dark" : "light",
    balance: faker.number
      .int({ min: 1000, max: 10000 })
      .toLocaleString("en-US", { style: "currency", currency: "USD" }),
    cardHolder: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber("#### **** **** ####"),
    validThru: faker.date
      .future()
      .toLocaleDateString("en-US", { month: "2-digit", year: "2-digit" }),
  }));
};

export const generateTransactions = (count: number = 10): Transaction[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(["income", "expense"]) as
      | "income"
      | "expense",
    amount: faker.number.int({ min: 50, max: 2000 }),
    description: faker.commerce.productName(),
    date: faker.date.recent().toISOString(),
    category: faker.helpers.arrayElement([
      "Shopping",
      "Food",
      "Transport",
      "Entertainment",
      "Bills",
    ]),
  }));
};

export const generateWeeklyActivity = (): ActivityData[] => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    date: day,
    income: faker.number.int({ min: 500, max: 2000 }),
    expenses: faker.number.int({ min: 200, max: 1500 }),
  }));
};

export const generateExpenseStats = (): ExpenseCategory[] => {
  const categories = ["Investment", "Bill Expense", "Entertainment", "Others"];
  const colors = ["#396AFF", "#FC7900", "#343C6A", "#232323"];

  let remaining = 100;

  return categories.map((category, index) => {
    const isLast = index === categories.length - 1;
    const percentage = isLast
      ? remaining
      : faker.number.int({
          min: Math.min(20, remaining),
          max: Math.min(35, remaining),
        });
    remaining -= percentage;

    return {
      category,
      amount: faker.number.int({ min: 500, max: 5000 }),
      percentage,
      color: colors[index],
    };
  });
};

export const generateBalanceHistory = (count: number = 12): BalanceData[] => {
  let balance = faker.number.int({ min: 5000, max: 10000 });
  return Array.from({ length: count }, (_, index) => {
    balance += faker.number.int({ min: 0, max: 1500 });
    return {
      date: faker.date.recent({ days: count - index }).toISOString(),
      balance,
    };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

export const generateContacts = (count: number = 3): Contact[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    role: faker.person.jobType(),
    avatar: faker.image.avatar(),
  }));
};

export const generateUser = (): User => {
  return {
    name: faker.person.fullName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    dateOfBirth: faker.date.birthdate().toISOString().split("T")[0],
    presentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
    city: faker.location.city(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
};
