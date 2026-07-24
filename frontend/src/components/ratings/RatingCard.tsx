import type { ApprovedRating } from '../../api/ratings';
import styles from './RatingCard.module.css';

interface RatingCardProps {
  rating: ApprovedRating;
}

export function RatingCard({ rating }: RatingCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>{'\u2605'.repeat(rating.rating)}{'\u2606'.repeat(5 - rating.rating)}</div>
      <div className={styles.quote}>&ldquo;{rating.quote}&rdquo;</div>
      <div className={styles.name}>- {rating.name}, {rating.role_company}</div>
    </div>
  );
}
