export default function StatsGrid({ items = [] }) {
  return (
    <div className="stats-grid">
      {items.map((item) => (
        <div key={item.label} className="card stat-card">
          <h3>{item.value}</h3>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
