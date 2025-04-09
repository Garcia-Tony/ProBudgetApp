import { ReactNode, createContext, useState } from 'react';
import { removeAuth, saveAuth } from '../lib';

export type User = {
  userId: number;
  username: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
};

export type UserContextValues = {
  user: User | undefined;
  token: string | undefined;
  expenses: Expense[];
  handleSignIn: (user: User, token: string) => void;
  handleSignOut: () => void;
  saveExpense: (expense: Expense) => void;
};

export const UserContext = createContext<UserContextValues | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  const [token, setToken] = useState<string | undefined>(() => {
    return localStorage.getItem('token') || undefined;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    if (user?.userId) {
      const storedExpenses = localStorage.getItem(`expenses_${user.userId}`);
      return storedExpenses ? JSON.parse(storedExpenses) : [];
    }
    return [];
  });

  function handleSignIn(user: User, token: string) {
    setUser(user);
    setToken(token);
    saveAuth(user, token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    const storedExpenses = localStorage.getItem(`expenses_${user.userId}`);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }

  function handleSignOut() {
    setUser(undefined);
    setToken(undefined);
    removeAuth();
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setExpenses([]);
  }

  const saveExpense = (newExpense: Expense) => {
    if (user?.userId) {
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      localStorage.setItem(
        `expenses_${user.userId}`,
        JSON.stringify(updatedExpenses)
      );
    }
  };

  const contextValue = {
    user,
    token,
    expenses,
    handleSignIn,
    handleSignOut,
    saveExpense,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
