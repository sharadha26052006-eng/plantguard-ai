export function EmptyDataState({ title = 'No connected dataset', detail = 'Connect public dataset to populate live analytical values.' }: { title?: string; detail?: string }) {
  return <div className="empty-data-state"><div className="empty-icon">⌁</div><div><span className="eyebrow">DATA CONNECTION REQUIRED</span><h3>{title}</h3><p>{detail}</p></div><span className="empty-status">AWAITING INPUT</span></div>;
}
