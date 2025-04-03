import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from './Pages/SwitchPage';
import { UserProvider } from './components/UserContext';
import { RegistrationForm } from './Pages/SignUp';

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<RegistrationForm />} />
        <Route path="/sign-up" element={<Navigate to="/" />} />
        <Route path="/log-in" element={<AuthPage mode="log-in" />} />
      </Routes>
    </UserProvider>
  );
}
