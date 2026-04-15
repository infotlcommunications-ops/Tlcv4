export default function PlanCard({ plan, type = 'internet' }) {
  return (
    <article className="plan-card card">
      <div className="plan-card-top">
        <div>
          <h3>{plan.name}</h3>
          <p className="price">₹{plan.price}</p>
        </div>
        <div className="badge-row">
          {plan.popular ? <span className="badge badge-primary">Popular</span> : null}
          {plan.featured ? <span className="badge">Featured</span> : null}
        </div>
      </div>
      <div className="plan-details">
        {type === 'cable' ? (
          <>
            <p><strong>Channels:</strong> {plan.channels}</p>
            <p><strong>Quality:</strong> {plan.quality}</p>
            <p><strong>Availability:</strong> {plan.availability}</p>
          </>
        ) : (
          <>
            <p><strong>Speed:</strong> {plan.speed} Mbps</p>
            <p><strong>Data/FUP:</strong> {plan.dataType}</p>
            <p><strong>Validity:</strong> {plan.validity}</p>
          </>
        )}
        <p><strong>Features:</strong> {plan.features || plan.benefits}</p>
        {plan.ottApps ? <p><strong>OTT Apps:</strong> {plan.ottApps}</p> : null}
        {plan.devices ? <p><strong>Devices:</strong> {plan.devices}</p> : null}
      </div>
      <a
  href={`https://wa.me/918296113293?text=Hi%20I%20am%20interested%20in%20${plan.name}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
>
  Enquire Now
</a>
    </article>
  );
}
