import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useData } from '../components/User';

interface Expense {
  name: string;
  amount: string;
  dueDate: string;
  schedule: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
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

  useEffect(() => {
    if (user) {
      const storedExpenses = localStorage.getItem(`expenses_${user.userId}`);
      setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
    }
  }, [user]);

  const addExpense = (expense: Expense) => {
    if (!user) return;

    const updatedExpenses = [...expenses, expense];
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
    <ExpenseContext.Provider value={{ expenses, addExpense, totalAmount }}>
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
