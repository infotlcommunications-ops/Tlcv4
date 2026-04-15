function formatDate(dateValue) {
  if (!dateValue) return 'Just now';
  const date = dateValue?.seconds ? new Date(dateValue.seconds * 1000) : new Date(dateValue);
  return date.toLocaleString();
}

export default function UpdateCard({ update }) {
  return (
    <article className={`update-card card ${update.pinned ? 'pinned' : ''}`}>
      <div className="update-header">
        <div>
          <h3>{update.title}</h3>
          <p>{formatDate(update.createdAt || update.updatedAt)}</p>
        </div>
        <div className="badge-row">
          {update.pinned ? <span className="badge badge-primary">Pinned</span> : null}
          <span className="badge">{update.category}</span>
          <span className={`badge badge-status badge-${update.status || 'active'}`}>{update.status || 'active'}</span>
        </div>
      </div>
      <p>{update.message}</p>
    </article>
  );
}
