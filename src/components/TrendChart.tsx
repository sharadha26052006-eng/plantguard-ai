import { useMemo } from 'react';

type ChartKind = 'vibration' | 'temperature' | 'health' | 'risk';
const colors: Record<ChartKind, string> = { vibration: '#b8f34a', temperature: '#f0b35b', health: '#8fd3ff', risk: '#ef6b73' };
const labels: Record<ChartKind, string> = { vibration: 'Vibration RMS', temperature: 'Temperature', health: 'Health score', risk: 'Risk trajectory' };

function makePath(values: number[], width: number, height: number, pad: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map((value, index) => {
    const x = pad + (index / (values.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / (max - min || 1)) * (height - pad * 2);
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

export function TrendChart({ kind, values, compact = false, title, unit }: { kind: ChartKind; values: number[]; compact?: boolean; title?: string; unit?: string }) {
  const width = compact ? 180 : 520;
  const height = compact ? 72 : 188;
  const pad = compact ? 8 : 18;
  const path = useMemo(() => makePath(values, width, height, pad), [height, pad, values, width]);
  const area = `${path} L ${width - pad} ${height - pad} L ${pad} ${height - pad} Z`;
  const color = colors[kind];
  return (
    <div className={`trend-chart ${compact ? 'compact' : ''}`}>
      {!compact ? <div className="chart-head"><div><span className="eyebrow">{title ?? labels[kind]}</span><strong>{unit ?? (kind === 'health' ? '0–100 index' : 'normalized demo trace')}</strong></div><span className="chart-legend"><i style={{ background: color }}></i>DEMO TRACE</span></div> : null}
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${labels[kind]} chart`} preserveAspectRatio="none">
        {!compact ? [0, 1, 2, 3].map((line) => <line key={line} x1={pad} x2={width - pad} y1={pad + line * ((height - pad * 2) / 3)} y2={pad + line * ((height - pad * 2) / 3)} stroke="rgba(157,175,188,.12)" strokeDasharray="3 6" />) : null}
        <path d={area} fill={color} opacity=".08" />
        <path d={path} fill="none" stroke={color} strokeWidth={compact ? 2 : 2.5} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={width - pad} cy={height - pad - ((values[values.length - 1] - Math.min(...values)) / (Math.max(...values) - Math.min(...values) || 1)) * (height - pad * 2)} r={compact ? 3 : 4} fill={color} />
      </svg>
      {!compact ? <div className="chart-axis"><span>− 24h</span><span>− 12h</span><span>NOW</span></div> : null}
    </div>
  );
}
