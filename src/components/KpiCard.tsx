type KpiTone = 'neutral' | 'positive' | 'warning' | 'critical';

export function KpiCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: KpiTone }) {
  return (
    <article className={`kpi-card ${tone}`}>
      <div className="kpi-label">{label}<span className="kpi-mark">↗</span></div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-delta"><span className="kpi-rule"></span>{delta}</div>
    </article>
  );
}
