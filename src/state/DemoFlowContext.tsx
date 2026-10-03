import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { getMachine, type Machine } from '../data/demoMachines';
import { getWorkflowStatus } from '../data/workflow';

export type FlowState = 'idle' | 'event_detected' | 'workflow_running' | 'awaiting_acknowledgement' | 'acknowledged' | 'resolved' | 'escalated';

type DemoFlowContextValue = {
  selectedMachine: Machine;
  flowState: FlowState;
  taskStatus: string;
  incidentStatus: string;
  notification: string;
  lastAction: string;
  selectMachine: (machineId: string) => void;
  simulateHighRisk: () => void;
  simulateAcknowledgement: () => void;
  simulateNoResponse: () => void;
  resetDemo: () => void;
  workflowStatus: (nodeId: string) => ReturnType<typeof getWorkflowStatus>;
};

const DemoFlowContext = createContext<DemoFlowContextValue | null>(null);

export function DemoFlowProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState('M-204');
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [taskStatus, setTaskStatus] = useState('NOT CREATED');
  const [incidentStatus, setIncidentStatus] = useState('READY');
  const [notification, setNotification] = useState('No active notification');
  const [lastAction, setLastAction] = useState('System ready for a controlled hackathon demonstration.');

  const value = useMemo<DemoFlowContextValue>(() => ({
    selectedMachine: getMachine(selectedId),
    flowState,
    taskStatus,
    incidentStatus,
    notification,
    lastAction,
    selectMachine: (machineId) => {
      setSelectedId(machineId);
      setLastAction(`${machineId} selected for analysis.`);
    },
    simulateHighRisk: () => {
      setSelectedId('M-204');
      setFlowState('awaiting_acknowledgement');
      setTaskStatus('AWAITING ACKNOWLEDGEMENT');
      setIncidentStatus('OPEN');
      setNotification('Maintenance acknowledgement requested for M-204.');
      setLastAction('Controlled high-risk event simulated. Workflow paused at acknowledgement.');
    },
    simulateAcknowledgement: () => {
      if (flowState === 'idle') return;
      setFlowState('resolved');
      setTaskStatus('RESOLVED');
      setIncidentStatus('RESOLVED');
      setNotification('Verification complete. M-204 incident resolved.');
      setLastAction('Acknowledgement received; verification completed and incident resolved.');
    },
    simulateNoResponse: () => {
      if (flowState === 'idle') return;
      setFlowState('escalated');
      setTaskStatus('ESCALATED');
      setIncidentStatus('ESCALATED');
      setNotification('Escalation notification sent to duty manager.');
      setLastAction('Acknowledgement timed out; incident escalated for human intervention.');
    },
    resetDemo: () => {
      setSelectedId('M-204');
      setFlowState('idle');
      setTaskStatus('NOT CREATED');
      setIncidentStatus('READY');
      setNotification('No active notification');
      setLastAction('System ready for a controlled hackathon demonstration.');
    },
    workflowStatus: (nodeId) => getWorkflowStatus(flowState, nodeId),
  }), [flowState, incidentStatus, lastAction, notification, selectedId, taskStatus]);

  return <DemoFlowContext.Provider value={value}>{children}</DemoFlowContext.Provider>;
}

export function useDemoFlow() {
  const context = useContext(DemoFlowContext);
  if (!context) throw new Error('useDemoFlow must be used within DemoFlowProvider');
  return context;
}
