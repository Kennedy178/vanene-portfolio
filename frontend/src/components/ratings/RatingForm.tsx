import { useState } from 'react';
import { submitRating } from '../../api/ratings';
import styles from './RatingForm.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function RatingForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [rating, setRating] = useState(5);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot - real visitors never see or fill this field (see CSS).
    // If it has a value, a bot filled it in; we still "succeed" visibly
    // so the bot doesn't learn its submission was rejected.
    const honeypot = formData.get('website') as string;

    try {
      if (!honeypot) {
        await submitRating({
          name: formData.get('name') as string,
          role_company: formData.get('role_company') as string,
          rating,
          quote: formData.get('quote') as string,
          email: (formData.get('email') as string) || undefined,
        });
      }
      setStatus('success');
      form.reset();
      setRating(5);
    } catch (error) {
      console.error('Rating submission failed:', error);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        Thank you - your rating has been submitted for review and will appear once approved.
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required placeholder="Your name" />
      </div>

      <div className={styles.field}>
        <label htmlFor="role_company">Role and company</label>
        <input id="role_company" name="role_company" type="text" required placeholder="e.g. Product Lead, Company" />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email (optional, private)</label>
        <input id="email" name="email" type="email" placeholder="Only used if you need to edit your rating later" />
      </div>

      <div className={styles.field}>
        <label htmlFor="quote">Your rating</label>
        <textarea id="quote" name="quote" required placeholder="What was it like working together?" />
      </div>

      <div className={styles.field}>
        <label htmlFor="stars">Stars</label>
        <select id="stars" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} star{n !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Honeypot field - hidden from real users via CSS, bots fill it anyway */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit rating'}
      </button>

      {status === 'error' && (
        <div className={styles.error}>
          Something went wrong submitting your rating. Please try again in a moment.
        </div>
      )}
    </form>
  );
}
