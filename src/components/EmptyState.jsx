export default function EmptyState({ title, subtitle }) {
  return (
    <div className="empty-state card">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
}
