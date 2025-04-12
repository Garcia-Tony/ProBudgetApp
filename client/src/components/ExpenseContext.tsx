import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useData } from '../components/User';

export interface Expense {
  id: string;
  name: string;
  amount: string;
  dueDate: string;
  schedule: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  editExpense: (updatedExpense: Expense) => void;
  selectedExpense: Expense | null;
  setSelectedExpense: (expense: Expense | null) => void;
  totalAmount: number;
  deleteExpense: (id: string) => void;
}

interface ExpenseProviderProps {
  children: ReactNode;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({
  children,
}) => {
  const { user } = useData();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    if (!user || !user.userId) return;

    const storedExpenses = localStorage.getItem(`expenses_${user.userId}`);
    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses);
      setExpenses(parsedExpenses);
    } else {
      setExpenses([]);
    }
  }, [user]);

  const editExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      );

      if (user?.userId) {
        localStorage.setItem(
          `expenses_${user.userId}`,
          JSON.stringify(updatedExpenses)
        );
      }

      return updatedExpenses;
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );

    if (user?.userId) {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      localStorage.setItem(
        `expenses_${user.userId}`,
        JSON.stringify(updatedExpenses)
      );
    }
  };

  const addExpense = (expense: Expense) => {
    if (!user) return;

    const newExpense: Expense = { ...expense, id: Date.now().toString() };
    const updatedExpenses = [...expenses, newExpense];

    setExpenses(updatedExpenses);
    localStorage.setItem(
      `expenses_${user.userId}`,
      JSON.stringify(updatedExpenses)
    );
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        editExpense,
        selectedExpense,
        setSelectedExpense,
        totalAmount,
        deleteExpense,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
