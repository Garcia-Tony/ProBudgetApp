import { RegistrationForm } from './SignUp';

type Props = {
  mode: 'sign-up' | 'log-in';
};
export function AuthPage({ mode }: Props) {
  return (
    <div className="container m-4">
      {mode === 'sign-up' && <RegistrationForm />}
    </div>
  );
}
