import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from './Pages/SwitchPage';
import { UserProvider } from './components/UserContext';
import { RegistrationForm } from './Pages/SignUp';
import { Home } from './Pages/Home';
import { NewExpense } from './Pages/NewExpense';
import { ExpenseProvider } from './components/ExpenseContext';
import { RecurringExpense } from './Pages/RecurringExpense';
import { CalendarExpense } from './Pages/CalendarExpense';
import { EditExpense } from './Pages/EditExpense';

export function App() {
  return (
    <UserProvider>
      <ExpenseProvider>
        <Routes>
          <Route index element={<RegistrationForm />} />
          <Route path="/sign-up" element={<Navigate to="/" />} />
          <Route path="/log-in" element={<AuthPage mode="log-in" />} />
          <Route path="/new-expense" element={<NewExpense />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recurring" element={<RecurringExpense />} />
          <Route path="/calendar" element={<CalendarExpense />} />
          <Route path="/edit-expense" element={<EditExpense />} />
        </Routes>
      </ExpenseProvider>
    </UserProvider>
  );
}
