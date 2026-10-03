import { useEffect, useState, type ComponentType } from 'react';
import { AppShell } from './components/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Fleet } from './pages/Fleet';
import { HealthAnalytics } from './pages/HealthAnalytics';
import { RiskAnalysis } from './pages/RiskAnalysis';
import { DecisionCenter } from './pages/DecisionCenter';
import { WorkflowMonitor } from './pages/WorkflowMonitor';
import { MaintenanceActions } from './pages/MaintenanceActions';
import { IncidentReports } from './pages/IncidentReports';
import { DataExplorer } from './pages/DataExplorer';
import { Architecture } from './pages/Architecture';

const pages: Record<string, ComponentType> = {
  '/': Dashboard,
  '/fleet': Fleet,
  '/health': HealthAnalytics,
  '/risk': RiskAnalysis,
  '/decision': DecisionCenter,
  '/workflow': WorkflowMonitor,
  '/actions': MaintenanceActions,
  '/incidents': IncidentReports,
  '/data': DataExplorer,
  '/architecture': Architecture,
};

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);
  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const Page = pages[route] ?? Dashboard;
  return <AppShell route={pages[route] ? route : '/'}><Page /></AppShell>;
}
