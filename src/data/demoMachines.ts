export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type MachineStatus = 'RUNNING' | 'AT RISK' | 'CRITICAL' | 'MAINTENANCE';

export type Machine = {
  id: string;
  type: string;
  health: number;
  risk: RiskLevel;
  trend: 'STABLE' | 'DEGRADING' | 'IMPROVING';
  status: MachineStatus;
  action: string;
  workflow: 'MONITORING' | 'ACTION REQUIRED' | 'ESCALATED' | 'RESOLVED';
  cycle: string;
  operatingTime: string;
  latestAnalysis: string;
  sensors: string[];
};

export const demoMachines: Machine[] = [
  {
    id: 'M-204',
    type: 'CNC Machine',
    health: 31,
    risk: 'HIGH',
    trend: 'DEGRADING',
    status: 'AT RISK',
    action: 'Maintenance Inspection',
    workflow: 'ACTION REQUIRED',
    cycle: 'Cycle 18,420',
    operatingTime: '2,984 h',
    latestAnalysis: 'Health threshold crossed; vibration and thermal traces are converging on an intervention window.',
    sensors: ['Vibration RMS', 'Temperature', 'Spindle Load'],
  },
  {
    id: 'M-117',
    type: 'Industrial Motor',
    health: 78,
    risk: 'MEDIUM',
    trend: 'STABLE',
    status: 'RUNNING',
    action: 'Monitor',
    workflow: 'MONITORING',
    cycle: 'Cycle 12,103',
    operatingTime: '1,742 h',
    latestAnalysis: 'Stable operating envelope with no threshold breach in the current demonstration trace.',
    sensors: ['Current Draw', 'Temperature', 'Bearing Noise'],
  },
  {
    id: 'M-302',
    type: 'Production Unit',
    health: 18,
    risk: 'CRITICAL',
    trend: 'DEGRADING',
    status: 'CRITICAL',
    action: 'Immediate Review',
    workflow: 'ESCALATED',
    cycle: 'Cycle 24,880',
    operatingTime: '4,260 h',
    latestAnalysis: 'Critical degradation pattern requires immediate review before the next operating window.',
    sensors: ['Pressure', 'Temperature', 'Flow Rate'],
  },
  {
    id: 'M-089',
    type: 'Hydraulic Press',
    health: 64,
    risk: 'MEDIUM',
    trend: 'IMPROVING',
    status: 'RUNNING',
    action: 'Monitor',
    workflow: 'MONITORING',
    cycle: 'Cycle 8,641',
    operatingTime: '1,204 h',
    latestAnalysis: 'Recent demonstration trace is returning toward the nominal operating band.',
    sensors: ['Pressure', 'Oil Temperature', 'Motor Current'],
  },
];

export const kpis = [
  { label: 'Total machines', value: '48', delta: 'Fleet scope', tone: 'neutral' },
  { label: 'Healthy', value: '32', delta: '66.7% of demo fleet', tone: 'positive' },
  { label: 'At risk', value: '9', delta: 'Watchlist', tone: 'warning' },
  { label: 'Critical', value: '7', delta: 'Immediate review', tone: 'critical' },
  { label: 'Active incidents', value: '4', delta: '2 need human action', tone: 'critical' },
  { label: 'Open maintenance', value: '8', delta: 'Awaiting acknowledgement', tone: 'warning' },
  { label: 'Automated actions', value: '21', delta: 'Workflow events', tone: 'positive' },
  { label: 'Resolved today', value: '13', delta: 'Verified', tone: 'positive' },
] as const;

export const chartSeries = {
  vibration: [43, 47, 45, 51, 54, 52, 59, 64, 61, 70, 74, 82, 79, 88, 92],
  temperature: [46, 48, 49, 48, 52, 53, 55, 56, 58, 57, 61, 63, 64, 67, 71],
  health: [72, 70, 69, 66, 63, 62, 59, 55, 52, 49, 47, 43, 39, 35, 31],
  risk: [18, 20, 22, 26, 29, 31, 35, 39, 42, 48, 54, 61, 66, 74, 81],
};

export const getMachine = (id: string) => demoMachines.find((machine) => machine.id === id) ?? demoMachines[0];
