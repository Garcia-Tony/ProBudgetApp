import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from './Pages/SwitchPage';
import { UserProvider } from './components/UserContext';
import { RegistrationForm } from './Pages/SignUp';
import { Home } from './Pages/Home';
import { NewExpense } from './Pages/NewExpense';
import { ExpenseProvider } from './components/ExpenseContext';

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
        </Routes>
      </ExpenseProvider>
    </UserProvider>
  );
}
