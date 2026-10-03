import { demoMachines, type Machine } from '../data/demoMachines';
import { StatusBadge } from './StatusBadge';

export function MachineTable({ onSelect, selectedId }: { onSelect: (machine: Machine) => void; selectedId?: string }) {
  return (
    <div className="table-wrap">
      <table className="machine-table">
        <thead><tr><th>Machine ID</th><th>Machine type</th><th>Health score</th><th>Risk level</th><th>Degradation trend</th><th>Current status</th><th>Recommended action</th><th>Workflow status</th></tr></thead>
        <tbody>
          {demoMachines.map((machine) => <tr key={machine.id} className={selectedId === machine.id ? 'selected' : ''} onClick={() => onSelect(machine)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') onSelect(machine); }}>
            <td><span className="machine-id">{machine.id}</span><span className="row-caret">↗</span></td>
            <td><span className="type-cell">{machine.type}<small>{machine.cycle}</small></span></td>
            <td><span className={`health-number ${machine.health < 35 ? 'low' : machine.health < 65 ? 'mid' : 'good'}`}>{machine.health}</span><div className="health-meter"><span style={{ width: `${machine.health}%` }}></span></div></td>
            <td><StatusBadge value={machine.risk} /></td>
            <td><span className={`trend-text ${machine.trend.toLowerCase()}`}>{machine.trend === 'DEGRADING' ? '↘' : machine.trend === 'IMPROVING' ? '↗' : '→'} {machine.trend}</span></td>
            <td><StatusBadge value={machine.status} /></td>
            <td><span className="action-cell">{machine.action}</span></td>
            <td><StatusBadge value={machine.workflow} /></td>
          </tr>)}
        </tbody>
      </table>
      <div className="table-note"><span>DEMONSTRATION DATA</span> derived from public predictive-maintenance dataset structure · Select a row to inspect evidence</div>
    </div>
  );
}
