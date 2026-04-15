import { useState } from 'react';
import { useSiteData } from '../../contexts/SiteDataContext';
import SectionHeader from '../../components/SectionHeader';
import Toast from '../../components/Toast';
import { createItem, COLLECTIONS } from '../../services/firestoreService';

const initialForm = { name: '', phone: '', email: '', message: '' };

export default function ContactPage() {
  const { settings } = useSiteData();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  function onChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setError('Name, phone, and message are required.');
      return;
    }
    setError('');
    await createItem(COLLECTIONS.enquiries, form);
    setForm(initialForm);
    setToast('Enquiry submitted successfully.');
  }

  return (
    <div className="page-stack">
      <SectionHeader eyebrow="Support" title="Contact and support" subtitle="Collect enquiries directly into Firestore from your public website." />
      <div className="grid grid-2">
        <div className="card contact-card">
          <h3>Support Details</h3>
          <p><strong>Phone:</strong> {settings.supportNumber}</p>
          <p><strong>WhatsApp:</strong> {settings.whatsappNumber}</p>
          <p><strong>Email:</strong> {settings.email}</p>
          <p><strong>Address:</strong> {settings.address}</p>
          <p><strong>Hours:</strong> {settings.supportHours}</p>
          <div className="map-placeholder">Google Maps Embed Placeholder</div>
        </div>
        <form className="card form-card" onSubmit={onSubmit}>
          <h3>Send an enquiry</h3>
          <input name="name" placeholder="Your name" value={form.name} onChange={onChange} />
          <input name="phone" placeholder="Phone number" value={form.phone} onChange={onChange} />
          <input name="email" placeholder="Email address" value={form.email} onChange={onChange} />
          <textarea name="message" rows="5" placeholder="Tell us what you need" value={form.message} onChange={onChange} />
          {error ? <p className="form-error">{error}</p> : null}
          <button className="btn btn-primary" type="submit">Submit Enquiry</button>
        </form>
      </div>
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}
