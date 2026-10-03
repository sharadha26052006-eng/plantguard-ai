export type TimelineEvent = {
  time: string;
  title: string;
  detail: string;
  kind: 'model' | 'ai' | 'automation' | 'human' | 'system';
};

export const baseTimeline: TimelineEvent[] = [
  { time: '14:32', title: 'Risk detected', detail: 'M-204 health score crossed the intervention threshold.', kind: 'model' },
  { time: '14:33', title: 'AI assessment generated', detail: 'Maintenance inspection recommended from the risk trajectory.', kind: 'ai' },
  { time: '14:34', title: 'Maintenance task created', detail: 'TASK-1048 assigned to Maintenance Engineer.', kind: 'automation' },
  { time: '14:34', title: 'Notification sent', detail: 'Operator acknowledgement requested.', kind: 'automation' },
];

export const resolvedTimeline: TimelineEvent[] = [
  ...baseTimeline,
  { time: '14:36', title: 'Acknowledgement received', detail: 'Maintenance Engineer accepted the action.', kind: 'human' },
  { time: '14:37', title: 'Incident verified', detail: 'Workflow verification completed.', kind: 'system' },
  { time: '14:38', title: 'Incident resolved', detail: 'Action closed with a verified outcome.', kind: 'system' },
];

export const escalatedTimeline: TimelineEvent[] = [
  ...baseTimeline,
  { time: '14:39', title: 'Acknowledgement timeout', detail: 'No response received within the controlled demo window.', kind: 'system' },
  { time: '14:40', title: 'Escalation notification sent', detail: 'Duty manager escalation generated.', kind: 'automation' },
];

export const activityFeed = [
  { time: '14:38:12', label: 'Workflow verification complete', source: 'n8n / simulated', tone: 'positive' },
  { time: '14:36:04', label: 'Maintenance acknowledgement received', source: 'Human gate', tone: 'positive' },
  { time: '14:34:19', label: 'TASK-1048 created for M-204', source: 'n8n / simulated', tone: 'warning' },
  { time: '14:33:52', label: 'AI operational assessment ready', source: 'Reasoning layer', tone: 'neutral' },
  { time: '14:32:10', label: 'Risk threshold crossed on M-204', source: 'Predictive layer', tone: 'critical' },
];
