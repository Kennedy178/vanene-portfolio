// src/components/admin/VisitorStats.tsx
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { getVisitorSummary, type VisitorSummary } from '../../api/admin';
import styles from './VisitorStats.module.css';

const PINE = '#1F6E52';
const RUST = '#B8452F';

export function VisitorStats() {
  const [data, setData] = useState<VisitorSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVisitorSummary()
      .then(setData)
      .catch((error) => console.error('Failed to load visitor stats:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading visitor stats...</div>;
  }

  if (!data) {
    return <div className={styles.loading}>Visitor stats are unavailable right now.</div>;
  }

  const deviceData = [
    { name: 'Desktop', value: data.deviceBreakdown.desktop },
    { name: 'Mobile', value: data.deviceBreakdown.mobile },
  ];

  return (
    <div>
      <div className={styles.statRow}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Sessions today</div>
          <div className={styles.statVal}>{data.sessionsToday}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Sessions this week</div>
          <div className={styles.statVal}>{data.sessionsThisWeek}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Page views this week</div>
          <div className={styles.statVal}>{data.pageViewsThisWeek}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Sessions this month</div>
          <div className={styles.statVal}>{data.sessionsThisMonth}</div>
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Daily page views - last 30 days</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.dailyPageViews}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="views" fill={PINE} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Unique session trend - last 30 days</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.sessionTrend}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="sessions" stroke={RUST} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Top pages</div>
          <ol className={styles.list}>
            {data.topPages.map((p) => (
              <li key={p.path}>
                <span>{p.path}</span>
                <span className={styles.listVal}>{p.views}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Top countries</div>
          <ol className={styles.list}>
            {data.topCountries.map((c) => (
              <li key={c.country}>
                <span>{c.country}</span>
                <span className={styles.listVal}>{c.visits}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Device breakdown</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={deviceData} dataKey="value" innerRadius={35} outerRadius={55}>
                <Cell fill={PINE} />
                <Cell fill={RUST} />
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.deviceLegend}>
            <span><i style={{ background: PINE }} /> Desktop {data.deviceBreakdown.desktop}</span>
            <span><i style={{ background: RUST }} /> Mobile {data.deviceBreakdown.mobile}</span>
          </div>
        </div>
      </div>
    </div>
  );
}