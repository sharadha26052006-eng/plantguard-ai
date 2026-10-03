import { useEffect, useState, type ReactNode } from 'react';
import { useDemoFlow } from '../state/DemoFlowContext';

const navGroups = [
  { label: 'OPERATIONS', items: [
    { href: '/', label: 'Operations Dashboard', icon: '◈' },
    { href: '/fleet', label: 'Machine Fleet', icon: '▦' },
    { href: '/health', label: 'Health Analytics', icon: '⌁' },
    { href: '/risk', label: 'Risk Analysis', icon: '△' },
  ]},
  { label: 'RESPONSE', items: [
    { href: '/decision', label: 'AI Decision Center', icon: '✦' },
    { href: '/workflow', label: 'Workflow Monitor', icon: '↯' },
    { href: '/actions', label: 'Maintenance Actions', icon: '⊞' },
    { href: '/incidents', label: 'Incident Reports', icon: '≡' },
  ]},
  { label: 'SYSTEM', items: [
    { href: '/data', label: 'Data Explorer', icon: '⌘' },
    { href: '/architecture', label: 'System Architecture', icon: '⌬' },
  ]},
];

function navigate(href: string) {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function AppShell({ children, route }: { children: ReactNode; route: string }) {
  const { flowState, taskStatus, simulateHighRisk, simulateAcknowledgement, simulateNoResponse, resetDemo } = useDemoFlow();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const demoActive = flowState !== 'idle';
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-block">
          <button className="brand-lockup" onClick={() => { navigate('/'); setMobileOpen(false); }} aria-label="Go to Operations Dashboard">
            <span className="brand-mark"><span></span><i></i></span>
            <span><strong>PLANTGUARD</strong><small>AI / OPERATIONS OS</small></span>
          </button>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">×</button>
        </div>
        <div className="rail-status"><span className="status-dot pulse"></span><span>DEMO ENVIRONMENT</span><b>v0.1</b></div>
        <nav className="rail-nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-group-label">{group.label}</div>
              {group.items.map((item) => (
                <button key={item.href} className={`nav-item ${route === item.href ? 'active' : ''}`} onClick={() => { navigate(item.href); setMobileOpen(false); }}>
                  <span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.href === '/workflow' && demoActive ? <em className="nav-live">LIVE</em> : null}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="rail-footer">
          <div className="footer-line"><span className="footer-key">DATA SOURCE</span><span className="footer-value">PUBLIC / STRUCTURE</span></div>
          <div className="footer-line"><span className="footer-key">MODEL</span><span className="footer-value muted">AWAITING TRAINING</span></div>
          <p>Research / hackathon prototype.<br />No live factory telemetry.</p>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation">☰</button>
          <div className="breadcrumb"><span>PLANTGUARD AI</span><i>/</i><b>{navGroups.flatMap((group) => group.items).find((item) => item.href === route)?.label ?? 'Operations Dashboard'}</b></div>
          <div className="topbar-actions">
            <span className="topbar-clock"><span className="status-dot"></span>CONTROLLED DEMO <b>14:38:12</b></span>
            <button className="icon-button" aria-label="System notifications">◎<span className="notification-badge">3</span></button>
            <button className="avatar" aria-label="User profile">OP</button>
          </div>
        </header>

        {demoActive ? (
          <div className={`demo-command-bar ${flowState}`}>
            <div className="command-signal"><span className="status-dot pulse"></span><strong>CONTROLLED HACKATHON DEMONSTRATION</strong><span className="command-divider"></span><span>{flowState === 'resolved' ? 'VERIFIED RESOLUTION' : flowState === 'escalated' ? 'ESCALATION ACTIVE' : 'WAITING FOR OPERATOR RESPONSE'}</span></div>
            <div className="command-actions">
              {flowState !== 'resolved' && flowState !== 'escalated' ? <><button className="button button-small button-lime" onClick={simulateAcknowledgement}>SIMULATE ACKNOWLEDGEMENT</button><button className="button button-small button-outline" onClick={simulateNoResponse}>SIMULATE NO RESPONSE</button></> : null}
              <button className="button button-small button-ghost" onClick={resetDemo}>RESET DEMO</button>
            </div>
          </div>
        ) : null}
        <main className="page-content">{children}</main>
        <div className="task-toast" aria-live="polite">
          {taskStatus !== 'NOT CREATED' ? <span className="toast-dot"></span> : null}
          {taskStatus !== 'NOT CREATED' ? `TASK-1048 · ${taskStatus}` : ''}
        </div>
      </div>
    </div>
  );
}

export { navigate };
