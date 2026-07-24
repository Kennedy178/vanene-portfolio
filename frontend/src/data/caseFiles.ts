export interface DecisionPair {
  rejectedLabel: string;
  rejectedText: string;
  chosenLabel: string;
  chosenText: string;
}

export interface CaseStat {
  value: string;
  label: string;
}

export interface CaseFile {
  slug: string;
  title: string;
  tag: string;
  liveUrl: string;
  githubUrl?: string; // omit entirely only if truly no repo exists at all;
                       // for private repos, still show "Private" - see CaseCard.tsx
  description: string;
  decision: DecisionPair;
  stats: CaseStat[];
  stack: string[];
}

export const caseFiles: CaseFile[] = [
  {
    slug: 'fraudguard-ai',
    title: 'FraudGuard AI',
    tag: 'Insurance fraud detection - East African motor market',
    liveUrl: 'https://fraudguard-six.vercel.app/',
    githubUrl: 'https://github.com/Kennedy178/insurance-fraud-detection-system',
    description:
      'An XGBoost classifier scoring motor insurance claims in real time. The interesting engineering wasn\'t the model - it was proving the mathematically optimal threshold was the wrong business decision, and building a system where that reasoning is versioned alongside the model, not lost in a notebook.',
    decision: {
      rejectedLabel: 'Rejected',
      rejectedText:
        'SMOTE oversampling - F1 0.896 in cross-validation, collapsed to 0.193 on real validation data.',
      chosenLabel: 'Shipped',
      chosenText:
        'Cost-weighted loss (scale_pos_weight 15.71) trained on real, untouched data.',
    },
    stats: [
      { value: '0.781', label: 'ROC-AUC, test set' },
      { value: '72.5%', label: 'fraud detection rate' },
      { value: '$294K', label: 'saved / 2,300 claims' },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'XGBoost', 'SHAP', 'React + TypeScript'],
  },
  {
    slug: 'dr-jacob-advisory',
    title: 'Dr. Jacob Advisory',
    tag: 'Multi-region professional services platform',
    liveUrl: 'https://drjacobadvisory.vercel.app',
    description:
      'A full-stack platform for a client with an international clientele - real-time testimonials, a blog CMS, and visitor analytics, run from an admin dashboard that needs zero code access to operate.',
    decision: {
      rejectedLabel: 'Rejected',
      rejectedText:
        'Single-layer backend - hard to test, harder to hand off to a non-technical client.',
      chosenLabel: 'Shipped',
      chosenText:
        'Four-layer architecture (router -> service -> repository -> database) plus row-level security on every table.',
    },
    stats: [
      { value: '7', label: 'production tables' },
      { value: '5', label: 'layers of spam prevention' },
      { value: '0', label: 'code access needed by client' },
    ],
    stack: ['FastAPI', 'Supabase', 'JWT Auth', 'Zustand', 'TipTap'],
  },
  {
    slug: 'getitdone',
    title: 'GetItDone',
    tag: 'Offline-first task management platform',
    liveUrl: 'https://getitdone-frontend.onrender.com/',
    githubUrl: 'https://github.com/Kennedy178/DailySchedule',
    description:
      'A task manager built around one constraint: it should never lose your data, online or off. The hard part wasn\'t the UI - it was the sync layer that has to be right every single time.',
    decision: {
      rejectedLabel: 'Rejected',
      rejectedText: 'Online-only writes - simple, but any network drop means lost tasks.',
      chosenLabel: 'Shipped',
      chosenText:
        'IndexedDB and Service Worker queue with automatic conflict resolution on reconnect.',
    },
    stats: [
      { value: '99%+', label: 'uptime on Render' },
      { value: '100%', label: 'functionality offline' },
      { value: '<500ms', label: 'average sync time' },
    ],
    stack: ['FastAPI', 'IndexedDB', 'Service Workers', 'Firebase FCM'],
  },
  {
    slug: 'flashhome-ai',
    title: 'FlashHome AI',
    tag: 'Real estate pricing and market insights',
    liveUrl: 'https://flash-home-model.onrender.com/',
    githubUrl: 'https://github.com/Kennedy178/housing_prediction',
    description:
      'An ML-powered platform for instant house price predictions and market trend insights, built on a LightGBM regression model with an 80% R-squared score.',
    decision: {
      rejectedLabel: 'Rejected',
      rejectedText:
        'A point-estimate-only prediction - accurate on average, unhelpful for a buyer weighing risk.',
      chosenLabel: 'Shipped',
      chosenText:
        'A confidence-interval price range alongside the point estimate, so the number reflects real uncertainty.',
    },
    stats: [
      { value: '80%', label: 'R-squared score' },
      { value: 'ZIP', label: 'level market trends' },
      { value: 'Docker', label: 'containerized deployment' },
    ],
    stack: ['Flask', 'LightGBM', 'Docker', 'SQLite'],
  },
];