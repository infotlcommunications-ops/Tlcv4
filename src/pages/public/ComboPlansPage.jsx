import { useMemo, useState } from 'react';
import { useSiteData } from '../../contexts/SiteDataContext';
import SectionHeader from '../../components/SectionHeader';
import PlanCard from '../../components/PlanCard';
import EmptyState from '../../components/EmptyState';

export default function ComboPlansPage() {
  const { comboPlans } = useSiteData();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => comboPlans.filter((plan) => {
    const haystack = `${plan.name} ${plan.ottApps} ${plan.benefits}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  }), [comboPlans, search]);

  return (
    <div className="page-stack">
      <SectionHeader eyebrow="Combo Packs" title="OTT + Internet Plans" subtitle="Showcase OTT subscriptions, speed, devices, validity, and benefits." />
      <div className="toolbar card">
        <input placeholder="Search combo plans..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {filtered.length ? (
        <div className="grid grid-3">
          {filtered.map((plan) => <PlanCard key={plan.id} plan={plan} type="combo" />)}
        </div>
      ) : (
        <EmptyState title="No combo plans available" subtitle="Add combo plans from the admin panel." />
      )}
    </div>
  );
}
