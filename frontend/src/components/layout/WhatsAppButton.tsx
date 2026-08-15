// src/components/layout/WhatsAppButton.tsx
import { useState } from 'react';
import styles from './WhatsAppButton.module.css';

// TODO: replace with the real WhatsApp number before launch, in international
// format with no leading + or spaces, e.g. "254712345678" for a Kenyan number.
const WHATSAPP_NUMBER = '12345678';

const PREFILLED_MESSAGE =
  "Hi Kennedy! I saw your portfolio and wanted to connect?";

const STORAGE_KEY = 'vanene-whatsapp-dismissed';

export function WhatsAppButton() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === 'true'
  );

  if (dismissed) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  function handleDismiss(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setDismissed(true);
  }

  return (
    <div className={styles.wrap}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={styles.btn}
        aria-label="Message on WhatsApp"
        title="Message on WhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.85 9.85 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.39 1.32-1.91 1.4-.49.08-1.1.11-1.78-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35s.38 0 .55.01c.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.35z"/>
        </svg>
      </a>
      <button
        type="button"
        onClick={handleDismiss}
        className={styles.dismiss}
        aria-label="Hide WhatsApp button"
        title="Hide"
      >
        {'\u00D7'}
      </button>
    </div>
  );
}