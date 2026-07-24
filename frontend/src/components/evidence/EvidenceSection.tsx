import { SectionHeading } from '../layout/SectionHeading';
import { EvidenceFrame } from './EvidenceFrame';
import type { Theme } from '../../hooks/useTheme';
import shapLight from '../../assets/evidence/shap-waterfall-light.png';
import shapDark from '../../assets/evidence/shap-waterfall-dark.png';
import featureLight from '../../assets/evidence/feature-importance-light.png';
import featureDark from '../../assets/evidence/feature-importance-dark.png';

interface EvidenceSectionProps {
  theme: Theme;
}

export function EvidenceSection({ theme }: EvidenceSectionProps) {
  return (
    <section id="evidence" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow="§ Proof of work"
          title="The reasoning behind the number, not just the number."
          description="Two exports pulled directly from the FraudGuard pipeline - not recreated for this page."
        />

        <EvidenceFrame
          theme={theme}
          tag="SHAP waterfall - highest-risk claim"
          caption={
            <>
              Predicted probability <b>0.9832</b>, confirmed fraud. Every feature's exact push
              toward that score - <b>AddressChange_Claim</b> and <b>Deductible</b> alone account
              for most of it.
            </>
          }
          lightSrc={shapLight}
          darkSrc={shapDark}
          alt="SHAP waterfall plot for the highest-risk claim in the test set: predicted probability 0.9832, confirmed fraud, with AddressChange_Claim_encoded and Deductible as the largest positive contributors"
        />

        <EvidenceFrame
          theme={theme}
          tag="Global feature importance - XGBoost"
          caption={
            <>
              Top three drivers - <b>external agent and holder fault</b>, <b>fault attribution</b>,{' '}
              <b>liability policy type</b> - match known motor-fraud patterns instead of a spurious
              correlation the model happened to find.
            </>
          }
          lightSrc={featureLight}
          darkSrc={featureDark}
          alt="Top 20 XGBoost feature importances, led by external agent holder fault at 0.189, fault binary at 0.142, and base policy liability at 0.108"
        />
      </div>
    </section>
  );
}
