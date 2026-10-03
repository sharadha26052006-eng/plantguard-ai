import { workflowNodes } from '../data/workflow';
import { useDemoFlow } from '../state/DemoFlowContext';
import { StatusBadge } from './StatusBadge';

export function WorkflowTimeline({ dense = false }: { dense?: boolean }) {
  const { workflowStatus, flowState } = useDemoFlow();
  return <div className={`workflow-timeline ${dense ? 'dense' : ''}`}>
    <div className="workflow-spine"></div>
    {workflowNodes.map((node, index) => {
      const status = workflowStatus(node.id);
      return <div className={`workflow-node ${status.toLowerCase()} ${status === 'WAITING' && flowState === 'awaiting_acknowledgement' ? 'current' : ''}`} key={node.id}>
        <div className="node-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
        <div className="node-card">
          <div className="node-topline"><span className="node-group">{node.group}</span><StatusBadge value={status} /></div>
          <div className="node-label">{node.label}</div>
          <p>{node.description}</p>
          <div className="node-meta"><span>14:{String(32 + Math.min(index * 2, 8)).padStart(2, '0')}:{String(10 + index * 4).padStart(2, '0')}</span><span>EXEC-{String(583 + index).padStart(4, '0')}</span></div>
        </div>
      </div>;
    })}
  </div>;
}
