import { useMemo, useState } from 'react';
import { useSiteData } from '../../contexts/SiteDataContext';
import SectionHeader from '../../components/SectionHeader';
import PlanCard from '../../components/PlanCard';
import EmptyState from '../../components/EmptyState';

export default function PlansPage({ type }) {
  const { cablePlans, internetPlans } = useSiteData();
  const [search, setSearch] = useState('');
  const [speed, setSpeed] = useState('all');
  const [dataType, setDataType] = useState('all');

  const isInternet = type === 'internet';
  const plans = isInternet ? internetPlans : cablePlans;

  const filtered = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch = plan.name?.toLowerCase().includes(search.toLowerCase()) || plan.features?.toLowerCase().includes(search.toLowerCase());
      const matchesSpeed = !isInternet || speed === 'all' || String(plan.speed) === speed;
      const matchesDataType = !isInternet || dataType === 'all' || plan.dataType === dataType;
      return matchesSearch && matchesSpeed && matchesDataType;
    });
  }, [plans, search, speed, dataType, isInternet]);

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow={isInternet ? 'Broadband Plans' : 'Cable TV Plans'}
        title={isInternet ? 'Choose the right internet plan' : 'Choose the right TV package'}
        subtitle={isInternet ? 'Search and filter by speed or FUP type.' : 'Browse all available cable TV packs.'}
      />

      <div className="toolbar card">
        <input placeholder="Search plans..." value={search} onChange={(e) => setSearch(e.target.value)} />
        {isInternet ? (
          <>
            <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
              <option value="all">All speeds</option>
              {[50, 100, 200, 300].map((value) => <option key={value} value={value}>{value} Mbps</option>)}
            </select>
            <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
              <option value="all">All data types</option>
              <option value="Unlimited">Unlimited</option>
              <option value="FUP">FUP</option>
            </select>
          </>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="grid grid-3">
          {filtered.map((plan) => <PlanCard key={plan.id} plan={plan} type={type} />)}
        </div>
      ) : (
        <EmptyState title="No plans found" subtitle="Try a different search or filter." />
      )}
    </div>
  );
}
