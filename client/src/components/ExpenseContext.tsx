import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useData } from '../components/User.ts';

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
    setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
  }, [user]);

  function editExpense(updatedExpense: Expense) {
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
  }

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
