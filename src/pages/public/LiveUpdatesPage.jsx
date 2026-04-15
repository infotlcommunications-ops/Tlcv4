import { useMemo, useState } from 'react';
import { useSiteData } from '../../contexts/SiteDataContext';
import SectionHeader from '../../components/SectionHeader';
import UpdateCard from '../../components/UpdateCard';
import EmptyState from '../../components/EmptyState';

export default function LiveUpdatesPage() {
  const { liveUpdates } = useSiteData();
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const updates = [...liveUpdates].sort((a, b) => Number(b.pinned) - Number(a.pinned));
    return updates.filter((item) => category === 'all' || item.category === category);
  }, [liveUpdates, category]);

  return (
    <div className="page-stack">
      <SectionHeader eyebrow="Realtime Updates" title="Live announcements and notices" subtitle="Pinned updates stay at the top. New updates appear instantly for all visitors." />
      <div className="toolbar card">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          <option value="alert">Alert</option>
          <option value="maintenance">Maintenance</option>
          <option value="info">Info</option>
          <option value="offer">Offer</option>
        </select>
      </div>
      {filtered.length ? filtered.map((item) => <UpdateCard key={item.id} update={item} />) : <EmptyState title="No updates yet" subtitle="Your admin can publish notices in real time." />}
    </div>
  );
}
