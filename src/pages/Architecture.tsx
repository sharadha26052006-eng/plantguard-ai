import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { StatusBadge } from '../components/StatusBadge';

const tech = [
  ['React / TypeScript', 'Implemented', 'positive'],
  ['SVG / CSS visualizations', 'Implemented', 'positive'],
  ['Public dataset structure', 'Demo-derived', 'warning'],
  ['n8n automation', 'Integration-ready / simulated', 'warning'],
  ['Python / Pandas / ML', 'Integration-ready', 'neutral'],
  ['FastAPI / database / LLM', 'Future connection', 'neutral'],
] as const;

export function Architecture() {
  return <div className="page-stack"><section className="page-heading"><div><div className="eyebrow">SYSTEM / INTEGRATION MAP</div><h1>System architecture</h1><p>One visual contract for how public data becomes a reasoned, automated, verifiable operational response.</p></div><span className="demo-label"><span className="status-dot"></span>HONEST PROTOTYPE BOUNDARY</span></section><section className="panel architecture-panel"><div className="panel-header"><div><span className="eyebrow">PLANTGUARD RESPONSE FABRIC</span><h2>Predictive signal to accountable action</h2></div><span className="architecture-caption">CURRENTLY VISUAL / INTEGRATION-READY</span></div><ArchitectureDiagram /></section><section className="architecture-bottom"><article className="panel tech-stack"><div className="panel-header"><div><span className="eyebrow">TECHNOLOGY MAP</span><h2>What is actually integrated</h2></div></div><div className="tech-list">{tech.map(([name, status, tone]) => <div key={name}><span>{name}</span><StatusBadge value={status} tone={tone as 'positive' | 'warning' | 'neutral'} /><span className="tech-arrow">→</span></div>)}</div></article><article className="panel architecture-principles"><span className="eyebrow">DESIGN CONTRACT</span><h2>Nothing is hidden behind a prediction.</h2><p>PlantGuard’s differentiator is the operational handoff: risk is made explainable, a decision is made explicit, automation is observable, and completion is verified.</p><div className="principle-chips"><span>PREDICT</span><span>REASON</span><span>AUTOMATE</span><span>VERIFY</span></div></article></section></div>;
}
