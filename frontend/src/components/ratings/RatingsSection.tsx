import { useEffect, useState } from 'react';
import { SectionHeading } from '../layout/SectionHeading';
import { RatingCard } from './RatingCard';
import { RatingForm } from './RatingForm';
import { RatingsEmptyState } from './RatingsEmptyState';
import { Pagination } from './Pagination';
import { getApprovedRatings, type ApprovedRating } from '../../api/ratings';
import styles from './RatingsSection.module.css';

export function RatingsSection() {
  const [ratings, setRatings] = useState<ApprovedRating[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getApprovedRatings(page)
      .then((data) => {
        if (cancelled) return;
        setRatings(data.items);
        setTotalPages(Math.max(1, Math.ceil(data.total / data.pageSize)));
      })
      .catch((error) => {
        console.error('Failed to load ratings:', error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  function handlePageChange(next: number) {
    setPage(next);
    document.getElementById('ratings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="ratings" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow="§ Ratings"
          title="What people say after working with me."
          description="Every rating is reviewed before it appears here - visible below only once approved."
        />

        {!loading && ratings.length > 0 && (
          <>
            <div className={styles.grid}>
              {ratings.map((rating) => (
                <RatingCard key={rating.id} rating={rating} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}

        {!loading && ratings.length === 0 && (
          <div className={styles.emptyWrap}>
            <RatingsEmptyState />
          </div>
        )}

        <div className={styles.formWrap}>
          <RatingForm />
        </div>
      </div>
    </section>
  );
}