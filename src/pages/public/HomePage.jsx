import { Link } from 'react-router-dom';
import { useSiteData } from '../../contexts/SiteDataContext';
import SectionHeader from '../../components/SectionHeader';
import StatsGrid from '../../components/StatsGrid';
import PlanCard from '../../components/PlanCard';
import UpdateCard from '../../components/UpdateCard';
import Loader from '../../components/Loader';

export default function HomePage() {
  const { loading, settings, internetPlans, comboPlans, liveUpdates } = useSiteData();

  if (loading) return <Loader fullPage message="Loading homepage..." />;

  const featuredPlans = [...internetPlans.filter((item) => item.featured), ...comboPlans.filter((item) => item.featured)].slice(0, 3);
  const latestUpdates = [...liveUpdates].slice(0, 3);

  return (
    <div className="page-stack">
      <section className="hero card hero-section">
        <div>
          <span className="eyebrow">Realtime ISP Website</span>
          <h1>{settings.heroTitle}</h1>
          <p>{settings.heroSubtitle}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/internet-plans">Browse Plans</Link>
            <Link className="btn btn-secondary" to="/live-updates">Live Updates</Link>
          </div>
        </div>
        <div className="hero-panel">
          <img src={settings.logoUrl} alt={settings.businessName} />
          <p>Support: {settings.supportNumber}</p>
          <p>Hours: {settings.supportHours}</p>
        </div>
      </section>

      <StatsGrid items={settings.stats || []} />

      <section>
        <SectionHeader
          eyebrow="Quick Access"
          title="Everything you need"
          subtitle="Easy navigation for broadband, cable TV, combo packs, updates, and support."
        />
        <div className="grid grid-4">
          {[
            ['Cable TV Plans', '/cable-tv-plans'],
            ['Internet Plans', '/internet-plans'],
            ['OTT + Internet', '/ott-internet-plans'],
            ['Areas Covered', '/areas-covered'],
          ].map(([label, path]) => (
            <Link key={label} to={path} className="card quick-link">{label}</Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Featured" title="Popular plans and offers" subtitle="Mark plans as featured or popular from admin mode." />
        <div className="grid grid-3">
          {featuredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} type={plan.ottApps ? 'combo' : 'internet'} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Realtime" title="Latest live updates" subtitle="The newest announcements appear here automatically using Firestore realtime listeners." action={<Link to="/live-updates" className="btn btn-sm">View All</Link>} />
        <div className="grid grid-1">
          {latestUpdates.map((item) => <UpdateCard key={item.id} update={item} />)}
        </div>
      </section>

      <section className="support-banner card">
        <div>
          <h2>Need a connection or upgrade?</h2>
          <p>Our support team can help with cable TV, fiber plans, combo packs, and service availability.</p>
        </div>
        <Link to="/contact" className="btn btn-primary">Contact Support</Link>
      </section>
    </div>
  );
}
