import { baseTimeline, escalatedTimeline, resolvedTimeline } from '../data/report';
import { useDemoFlow } from '../state/DemoFlowContext';

export function IncidentTimeline() {
  const { flowState } = useDemoFlow();
  const events = flowState === 'resolved' ? resolvedTimeline : flowState === 'escalated' ? escalatedTimeline : baseTimeline;
  return <div className="incident-timeline">{events.map((event, index) => <div className={`incident-event ${event.kind}`} key={`${event.title}-${index}`}><div className="event-time">{event.time}</div><div className="event-node"><span></span></div><div className="event-copy"><strong>{event.title}</strong><p>{event.detail}</p><small>{event.kind === 'automation' ? 'SIMULATED WORKFLOW EVENT' : event.kind === 'model' ? 'PREDICTIVE MODEL OUTPUT' : event.kind === 'ai' ? 'AI REASONING LAYER' : 'CONTROLLED DEMO STATE'}</small></div></div>)}</div>;
}
