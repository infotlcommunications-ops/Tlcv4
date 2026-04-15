import { useEffect, useMemo, useState } from 'react';
import { useSiteData } from '../../contexts/SiteDataContext';
import SectionHeader from '../../components/SectionHeader';
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';
import { COLLECTIONS, createItem, deleteItem, saveSettings, updateItem } from '../../services/firestoreService';
import { defaultSettings, seedDemoData } from '../../utils/demoData';

const TABS = [
  'overview',
  'siteSettings',
  'cablePlans',
  'internetPlans',
  'comboPlans',
  'liveUpdates',
  'coveredAreas',
  'enquiries',
];

const labelMap = {
  overview: 'Overview',
  siteSettings: 'Site Settings',
  cablePlans: 'Cable TV Plans',
  internetPlans: 'Internet Plans',
  comboPlans: 'OTT + Internet',
  liveUpdates: 'Live Updates',
  coveredAreas: 'Areas Covered',
  enquiries: 'Enquiries',
};

const configMap = {
  cablePlans: {
    title: 'Manage Cable TV Plans',
    fields: [
      { name: 'name', label: 'Plan Name', type: 'text', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'channels', label: 'Channel Count', type: 'number', required: true },
      { name: 'quality', label: 'HD/SD Info', type: 'text', required: true },
      { name: 'features', label: 'Features', type: 'textarea', required: true },
      { name: 'availability', label: 'Availability', type: 'text', required: true },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  internetPlans: {
    title: 'Manage Internet Plans',
    fields: [
      { name: 'name', label: 'Plan Name', type: 'text', required: true },
      { name: 'speed', label: 'Speed (Mbps)', type: 'number', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'dataType', label: 'Data/FUP', type: 'text', required: true },
      { name: 'validity', label: 'Validity', type: 'text', required: true },
      { name: 'features', label: 'Features', type: 'textarea', required: true },
      { name: 'popular', label: 'Popular', type: 'checkbox' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  comboPlans: {
    title: 'Manage OTT + Internet Plans',
    fields: [
      { name: 'name', label: 'Plan Name', type: 'text', required: true },
      { name: 'speed', label: 'Speed (Mbps)', type: 'number', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'ottApps', label: 'OTT Apps', type: 'textarea', required: true },
      { name: 'devices', label: 'Devices', type: 'number', required: true },
      { name: 'validity', label: 'Validity', type: 'text', required: true },
      { name: 'benefits', label: 'Extra Benefits', type: 'textarea', required: true },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  liveUpdates: {
    title: 'Manage Live Updates',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'text', required: true },
      { name: 'pinned', label: 'Pinned', type: 'checkbox' },
    ],
  },
  coveredAreas: {
    title: 'Manage Areas Covered',
    fields: [
      { name: 'name', label: 'Area Name', type: 'text', required: true },
      { name: 'status', label: 'Service Status', type: 'text', required: true },
      { name: 'note', label: 'Note', type: 'textarea', required: false },
      { name: 'cable', label: 'Cable TV', type: 'checkbox' },
      { name: 'internet', label: 'Internet', type: 'checkbox' },
      { name: 'ott', label: 'OTT', type: 'checkbox' },
    ],
  },
};

function normalizeValue(field, value) {
  if (field.type === 'number') return Number(value);
  return value;
}

function renderSummaryCard(title, value) {
  return (
    <div className="card stat-card" key={title}>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

function DynamicForm({ fields, value, onChange, onSubmit, submitLabel }) {
  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <div className="grid grid-2 admin-form-grid">
        {fields.map((field) => (
          <label key={field.name} className={field.type === 'textarea' ? 'full-width' : ''}>
            <span>{field.label}</span>
            {field.type === 'textarea' ? (
              <textarea
                rows="4"
                value={value[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value, field.type)}
              />
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={!!value[field.name]}
                onChange={(e) => onChange(field.name, e.target.checked, field.type)}
              />
            ) : (
              <input
                type={field.type}
                value={value[field.name] ?? ''}
                onChange={(e) => onChange(field.name, e.target.value, field.type)}
              />
            )}
          </label>
        ))}
      </div>
      <button className="btn btn-primary" type="submit">{submitLabel}</button>
    </form>
  );
}

function DataTable({ items, fields, onEdit, onDelete }) {
  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            {fields.map((field) => <th key={field.name}>{field.label}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {fields.map((field) => (
                <td key={field.name}>{typeof item[field.name] === 'boolean' ? (item[field.name] ? 'Yes' : 'No') : item[field.name]}</td>
              ))}
              <td className="action-row">
                <button className="btn btn-sm" onClick={() => onEdit(item)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DashboardPage() {
  const { settings, cablePlans, internetPlans, comboPlans, liveUpdates, coveredAreas, enquiries } = useSiteData();
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({});
  const [settingsForm, setSettingsForm] = useState(settings || defaultSettings);

  useEffect(() => {
    setSettingsForm(settings || defaultSettings);
  }, [settings]);

  const dataMap = useMemo(() => ({ cablePlans, internetPlans, comboPlans, liveUpdates, coveredAreas }), [cablePlans, internetPlans, comboPlans, liveUpdates, coveredAreas]);

  function resetEditor() {
    setEditingId(null);
    setFormState({});
  }

  function handleFieldChange(name, value, type) {
    setFormState((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  }

  function handleSettingsChange(name, value) {
    setSettingsForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSettingsSubmit(event) {
    event.preventDefault();
    await saveSettings(settingsForm);
    setToast('Site settings saved successfully.');
  }

  async function handleCrudSubmit(event) {
    event.preventDefault();
    const config = configMap[activeTab];
    const missing = config.fields.filter((field) => field.required && !formState[field.name] && formState[field.name] !== 0);
    if (missing.length) {
      setToast(`Please fill: ${missing.map((item) => item.label).join(', ')}`);
      return;
    }

    if (editingId) {
      await updateItem(activeTab, editingId, formState);
      setToast('Record updated successfully.');
    } else {
      await createItem(activeTab, formState);
      setToast('Record created successfully.');
    }
    resetEditor();
  }

  function startEdit(item) {
    setEditingId(item.id);
    setFormState(item);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteItem(activeTab, deleteTarget.id);
    setDeleteTarget(null);
    setToast('Record deleted successfully.');
    resetEditor();
  }

  async function handleSeed() {
    await seedDemoData();
    setToast('Demo data inserted.');
  }

  return (
    <div className="page-stack admin-page">
      <SectionHeader eyebrow="Admin Dashboard" title={labelMap[activeTab]} subtitle="Manage website content in real time with Firebase." />

      <div className="tab-strip">
        {TABS.map((tab) => (
          <button key={tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => { setActiveTab(tab); resetEditor(); }}>
            {labelMap[tab]}
          </button>
        ))}
      </div>

      {activeTab === 'overview' ? (
        <>
          <div className="stats-grid">
            {[
              ['Cable Plans', cablePlans.length],
              ['Internet Plans', internetPlans.length],
              ['Combo Plans', comboPlans.length],
              ['Live Updates', liveUpdates.length],
              ['Covered Areas', coveredAreas.length],
              ['Enquiries', enquiries.length],
            ].map(([title, value]) => renderSummaryCard(title, value))}
          </div>
          <div className="card overview-actions">
            <h3>Quick actions</h3>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={handleSeed}>Seed Demo Data</button>
              <button className="btn btn-secondary" onClick={() => setActiveTab('siteSettings')}>Edit Branding</button>
            </div>
          </div>
        </>
      ) : null}

      {activeTab === 'siteSettings' ? (
        <form className="card form-card" onSubmit={handleSettingsSubmit}>
          <div className="grid grid-2 admin-form-grid">
            {[
              ['businessName', 'Business Name'],
              ['logoUrl', 'Logo URL'],
              ['heroTitle', 'Hero Title'],
              ['heroSubtitle', 'Hero Subtitle'],
              ['supportNumber', 'Support Number'],
              ['whatsappNumber', 'WhatsApp Number'],
              ['email', 'Email'],
              ['address', 'Address'],
              ['supportHours', 'Support Hours'],
            ].map(([name, label]) => (
              <label key={name} className={['heroSubtitle', 'address'].includes(name) ? 'full-width' : ''}>
                <span>{label}</span>
                {['heroSubtitle', 'address'].includes(name) ? (
                  <textarea rows="3" value={settingsForm[name] || ''} onChange={(e) => handleSettingsChange(name, e.target.value)} />
                ) : (
                  <input value={settingsForm[name] || ''} onChange={(e) => handleSettingsChange(name, e.target.value)} />
                )}
              </label>
            ))}
          </div>
          <button className="btn btn-primary" type="submit">Save Settings</button>
        </form>
      ) : null}

      {configMap[activeTab] ? (
        <>
          <DynamicForm
            fields={configMap[activeTab].fields}
            value={formState}
            onChange={handleFieldChange}
            onSubmit={handleCrudSubmit}
            submitLabel={editingId ? 'Update Record' : 'Create Record'}
          />
          <DataTable
            items={dataMap[activeTab] || []}
            fields={configMap[activeTab].fields}
            onEdit={startEdit}
            onDelete={(item) => setDeleteTarget(item)}
          />
        </>
      ) : null}

      {activeTab === 'enquiries' ? (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete record?"
        message="This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}
