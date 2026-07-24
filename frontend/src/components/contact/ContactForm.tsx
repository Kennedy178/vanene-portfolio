import { useState } from 'react';
import { submitContact } from '../../api/contact';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await submitContact({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      });
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error('Contact submission failed:', error);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        Thanks for reaching out - I'll get back to you within 24 to 48 hours.
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="contact-name">Name</label>
      <input id="contact-name" name="name" type="text" required placeholder="Your name" />

      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" required placeholder="you@company.com" />

      <label htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" required placeholder="What are you building?" />

      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>

      {status === 'error' && (
        <div className={styles.error}>
          Something went wrong sending your message. Please try again, or email me directly.
        </div>
      )}
    </form>
  );
}
