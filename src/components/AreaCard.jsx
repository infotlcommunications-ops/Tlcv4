export default function AreaCard({ area }) {
  const services = [area.cable && 'Cable TV', area.internet && 'Internet', area.ott && 'OTT'].filter(Boolean);
  return (
    <article className="card area-card">
      <div className="area-card-top">
        <h3>{area.name}</h3>
        <span className="badge badge-primary">{area.status}</span>
      </div>
      <p><strong>Services:</strong> {services.join(', ') || 'No services tagged'}</p>
      {area.note ? <p><strong>Note:</strong> {area.note}</p> : null}
    </article>
  );
}
