// src/pages/admin/AdminLogin.tsx
import { useState } from 'react';
import styles from './AdminLogin.module.css';

interface AdminLoginProps {
  onLogin: (password: string) => Promise<void>;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await onLogin(password);
    } catch {
      setError('Incorrect password.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          Kennedy <em>Vanene</em>
        </div>
        <div className={styles.label}>Admin access</div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Checking...' : 'Enter'}
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}