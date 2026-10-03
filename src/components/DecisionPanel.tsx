import { useDemoFlow } from '../state/DemoFlowContext';
import { StatusBadge } from './StatusBadge';

export function DecisionPanel({ compact = false }: { compact?: boolean }) {
  const { selectedMachine, flowState } = useDemoFlow();
  return <div className={`decision-panel ${compact ? 'compact' : ''}`}>
    <section className="decision-column model-column">
      <div className="panel-kicker"><span className="kicker-index">01</span>PREDICTIVE MODEL OUTPUT</div>
      <div className="decision-machine"><span className="machine-id">{selectedMachine.id}</span><span className="decision-type">{selectedMachine.type}</span></div>
      <div className="decision-score"><span className="score-number">{selectedMachine.health}</span><span className="score-label">/ 100<br /><small>HEALTH SCORE</small></span></div>
      <div className="decision-facts"><div><span>RISK LEVEL</span><StatusBadge value={selectedMachine.risk} /></div><div><span>TREND</span><b className="trend-text degrading">↘ {selectedMachine.trend}</b></div><div><span>THRESHOLD</span><b className="threshold-crossed">CROSSED</b></div></div>
      {!compact ? <div className="model-note"><span className="status-dot"></span>Prototype / awaiting connected model</div> : null}
    </section>
    <section className="decision-column reasoning-column">
      <div className="panel-kicker"><span className="kicker-index">02</span>AI REASONING</div>
      <div className="reasoning-head"><span className="reasoning-icon">✦</span><div><h3>Schedule maintenance inspection</h3><span>Proposed operational response</span></div></div>
      <div className="why-block"><span className="eyebrow">WHY THIS ACTION</span><ul><li>Machine health has deteriorated across the current trace.</li><li>Recent trend indicates increasing operational risk.</li><li>Intervention threshold has been reached.</li></ul></div>
      <div className="impact-row"><div><span className="eyebrow">OPERATIONAL IMPACT</span><p>Potential maintenance intervention required before the next operating window.</p></div><div><span className="eyebrow">HUMAN APPROVAL</span><StatusBadge value="REQUIRED" tone="warning" /></div></div>
      {!compact ? <div className="reasoning-footer"><span className="eyebrow">WORKFLOW</span><StatusBadge value={flowState === 'idle' ? 'READY TO EXECUTE' : flowState === 'resolved' ? 'VERIFIED' : flowState === 'escalated' ? 'ESCALATED' : 'EXECUTING'} /></div> : null}
    </section>
  </div>;
}
