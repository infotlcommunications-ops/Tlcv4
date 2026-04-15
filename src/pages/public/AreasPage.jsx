import { useMemo, useState } from 'react';
import { useSiteData } from '../../contexts/SiteDataContext';
import SectionHeader from '../../components/SectionHeader';
import AreaCard from '../../components/AreaCard';
import EmptyState from '../../components/EmptyState';

export default function AreasPage() {
  const { coveredAreas } = useSiteData();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => coveredAreas.filter((area) => area.name.toLowerCase().includes(search.toLowerCase())), [coveredAreas, search]);

  return (
    <div className="page-stack">
      <SectionHeader eyebrow="Coverage" title="Areas we cover" subtitle="Realtime coverage list with service availability and notes." />
      <div className="toolbar card">
        <input placeholder="Search area name..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {filtered.length ? (
        <div className="grid grid-3">
          {filtered.map((area) => <AreaCard key={area.id} area={area} />)}
        </div>
      ) : (
        <EmptyState title="No matching areas" subtitle="Try another area name." />
      )}
    </div>
  );
}
