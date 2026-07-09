import { useState, type FormEvent } from 'react';
import { AppLayout } from '../components/AppLayout';
import './LoginPage.css';

type LoginPageProps = {
  onLogin: (email: string, password: string) => boolean;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('ava@studio.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid demo credentials. Try ava@studio.com or mina@client.com with password123.');
    }
  };

  return (
    <AppLayout activeUser={null} onLogout={() => undefined}>
      <div className="card hero-card">
        <p className="eyebrow">Secure sign in</p>
        <h2>Welcome to the photo album portal.</h2>
        <p>Use the same sign-in experience for photographers and clients. Your role is determined by the mock account you use.</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button type="submit">Sign in</button>
        </form>
        {error ? <p className="helper-text">{error}</p> : <p className="helper-text">Demo accounts: ava@studio.com or mina@client.com with password123.</p>}
      </div>
    </AppLayout>
  );
}
