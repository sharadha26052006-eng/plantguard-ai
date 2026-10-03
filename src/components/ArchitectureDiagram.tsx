const stages = [
  { id: '01', label: 'PUBLIC DATA', detail: 'Predictive-maintenance structure', tone: 'source' },
  { id: '02', label: 'DATA PROCESSING', detail: 'Integration-ready boundary', tone: 'neutral' },
  { id: '03', label: 'ML / RISK MODEL', detail: 'Prototype output', tone: 'model' },
  { id: '04', label: 'AI REASONING', detail: 'Explainable proposal', tone: 'lime' },
  { id: '05', label: 'IMPACT ANALYSIS', detail: 'Decision support', tone: 'amber' },
  { id: '06', label: 'DECISION ENGINE', detail: 'Human approval gate', tone: 'amber' },
  { id: '07', label: 'n8n', detail: 'Simulated workflow boundary', tone: 'automation' },
];

export function ArchitectureDiagram() {
  return <div className="architecture-diagram"><div className="architecture-flow">{stages.map((stage, index) => <div className="architecture-stage-wrap" key={stage.id}><div className={`architecture-stage ${stage.tone}`}><span className="stage-id">{stage.id}</span><strong>{stage.label}</strong><small>{stage.detail}</small></div>{index < stages.length - 1 ? <span className="flow-arrow">↓</span> : null}</div>)}</div><div className="architecture-branches"><div className="branch-line"></div>{['MAINTENANCE TASK', 'NOTIFICATION', 'ESCALATION'].map((item, index) => <div className={`branch-card branch-${index}`} key={item}><span className="branch-dot"></span><strong>{item}</strong><small>n8n action surface</small></div>)}</div><div className="architecture-end"><span className="stage-id">08</span><strong>VERIFICATION</strong><span>→ RESOLVE / ESCALATE</span></div></div>;
}
