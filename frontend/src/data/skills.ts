export interface SkillRow {
  name: string;
  proof: string;
  level: number; // 0-100, used for the bar width
}

export interface SkillGroup {
  title: string;
  subtitle: string;
  rows: SkillRow[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'ML & data',
    subtitle: 'Where the decisions get made',
    rows: [
      { name: 'XGBoost & cost-calibrated thresholds', proof: 'FraudGuard AI', level: 95 },
      { name: 'SHAP interpretability', proof: 'FraudGuard AI', level: 90 },
      { name: 'Feature engineering at scale', proof: '76 features, FraudGuard', level: 88 },
      { name: 'LightGBM & regression modeling', proof: 'FlashHome AI', level: 80 },
    ],
  },
  {
    title: 'Backend & systems',
    subtitle: 'Where the decisions survive contact with users',
    rows: [
      { name: 'FastAPI, async SQLAlchemy, Alembic', proof: '3 production systems', level: 93 },
      { name: 'Auth, audit trails, RLS', proof: 'Dr. Jacob Advisory', level: 88 },
      { name: 'Offline-first sync & conflict resolution', proof: 'GetItDone', level: 85 },
      { name: 'React, TypeScript, Zustand', proof: '2 full-stack platforms', level: 78 },
    ],
  },
];
