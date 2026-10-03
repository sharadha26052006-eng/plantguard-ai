export type WorkflowStatus = 'COMPLETED' | 'RUNNING' | 'WAITING' | 'FAILED' | 'ESCALATED';

export type WorkflowNode = {
  id: string;
  label: string;
  group: string;
  description: string;
};

export const workflowNodes: WorkflowNode[] = [
  { id: 'event', label: 'DATA EVENT', group: 'TRIGGER', description: 'Demo machine-health signal received.' },
  { id: 'validate', label: 'VALIDATE', group: 'GUARDRAIL', description: 'Payload shape and source boundary checked.' },
  { id: 'context', label: 'GET MACHINE CONTEXT', group: 'ENRICHMENT', description: 'Machine record and operating context attached.' },
  { id: 'risk', label: 'HEALTH / RISK ANALYSIS', group: 'PREDICTIVE', description: 'Health score, trend, and risk tier evaluated.' },
  { id: 'reasoning', label: 'AI REASONING', group: 'INTERPRETATION', description: 'Risk evidence translated into a proposed action.' },
  { id: 'impact', label: 'IMPACT ANALYSIS', group: 'DECISION SUPPORT', description: 'Potential operational impact summarized.' },
  { id: 'decision', label: 'DECISION', group: 'HUMAN GATE', description: 'Recommendation queued for human approval.' },
  { id: 'task', label: 'CREATE MAINTENANCE TASK', group: 'ACTION', description: 'TASK-1048 created for Maintenance Engineer.' },
  { id: 'notify', label: 'NOTIFY', group: 'ACTION', description: 'Maintenance notification generated.' },
  { id: 'wait', label: 'WAIT FOR ACKNOWLEDGEMENT', group: 'WAIT STATE', description: 'Workflow pauses until an operator responds.' },
  { id: 'verify', label: 'VERIFY', group: 'CONTROL', description: 'Acknowledgement and action completion checked.' },
  { id: 'resolve', label: 'RESOLVE / ESCALATE', group: 'OUTCOME', description: 'Incident resolved or escalated on timeout.' },
];

export const getWorkflowStatus = (flowState: string, nodeId: string): WorkflowStatus => {
  if (flowState === 'idle') return nodeId === 'event' ? 'COMPLETED' : 'WAITING';
  if (flowState === 'awaiting_acknowledgement' || flowState === 'event_detected' || flowState === 'workflow_running') {
    if (nodeId === 'wait') return 'WAITING';
    if (nodeId === 'verify' || nodeId === 'resolve') return 'WAITING';
    return 'COMPLETED';
  }
  if (flowState === 'acknowledged' || flowState === 'resolved') {
    if (nodeId === 'resolve') return flowState === 'resolved' ? 'COMPLETED' : 'RUNNING';
    return 'COMPLETED';
  }
  if (flowState === 'escalated') {
    if (nodeId === 'wait' || nodeId === 'resolve') return 'ESCALATED';
    return 'COMPLETED';
  }
  return 'WAITING';
};
