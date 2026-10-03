type StatusTone = 'positive' | 'warning' | 'critical' | 'neutral' | 'lime' | 'waiting';

const toneFor = (value: string): StatusTone => {
  const normalized = value.toLowerCase();
  if (normalized.includes('critical') || normalized.includes('escalat')) return 'critical';
  if (normalized.includes('high') || normalized.includes('risk') || normalized.includes('action')) return 'warning';
  if (normalized.includes('complete') || normalized.includes('resolve') || normalized.includes('running') || normalized.includes('stable') || normalized.includes('acknowledg')) return 'positive';
  if (normalized.includes('wait') || normalized.includes('monitor')) return 'waiting';
  return 'neutral';
};

export function StatusBadge({ value, tone, dot = true }: { value: string; tone?: StatusTone; dot?: boolean }) {
  const resolvedTone = tone ?? toneFor(value);
  return <span className={`status-badge ${resolvedTone}`}>{dot ? <span className="badge-dot"></span> : null}{value}</span>;
}
