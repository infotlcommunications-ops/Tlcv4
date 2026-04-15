import { createItem, saveSettings, COLLECTIONS } from '../services/firestoreService';

export const defaultSettings = {
  businessName: 'Tetelestai Communications',
  logoUrl: '/logo.png',
  heroTitle: 'Fast Internet, Reliable Cable TV, Smarter OTT Bundles',
  heroSubtitle: 'Manage everything in real time with a customer-friendly digital experience.',
  supportNumber: '+91 8296113293',
  whatsappNumber: '+91 8296113293',
  email: 'support@tetelestai.in',
  address: 'Your Real Address Here',
  supportHours: 'Mon - Sun | 8:00 AM to 9:00 PM',
  stats: [
    { label: 'Active Users', value: '5000' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Areas Covered', value: '6' },
    { label: 'Support', value: '8 AM - 9 PM' },
  ],
};

export async function seedDemoData() {
  await saveSettings(defaultSettings);


  const cablePlans = [
    { name: 'Silver TV', price: 299, channels: 180, quality: 'SD + HD Mix', features: 'News, movies, kids, sports', availability: 'Available', featured: true },
    { name: 'Gold TV', price: 399, channels: 240, quality: 'HD', features: 'Popular entertainment channels', availability: 'Available', featured: false },
  ];

  const internetPlans = [
    { name: 'Starter 50', speed: 50, price: 499, dataType: 'Unlimited', validity: '30 Days', features: 'Ideal for study and browsing', popular: false, featured: true },
    { name: 'Turbo 100', speed: 100, price: 799, dataType: 'Unlimited', validity: '30 Days', features: 'Streaming and gaming friendly', popular: true, featured: true },
  ];

  const comboPlans = [
    { name: 'Prime Combo', speed: 100, price: 999, ottApps: 'JioHotstar, Sony LIV, Prime Video', devices: 2, validity: '30 Days', benefits: 'One bill for broadband + OTT', featured: true },
  ];

  const liveUpdates = [
    { title: 'Welcome Offer', message: 'New users get free installation this week.', category: 'offer', status: 'active', pinned: true },
    { title: 'Maintenance Notice', message: 'Scheduled fiber maintenance on Sunday 2 AM - 4 AM.', category: 'maintenance', status: 'scheduled', pinned: false },
  ];

  const areas = [
    { name: 'Kavuru', cable: true, internet: true, ott: true, status: 'Live', note: 'New connections open' },
    { name: 'Town Center', cable: true, internet: true, ott: false, status: 'Live', note: 'OTT bundles coming soon' },
  ];

  await Promise.all(cablePlans.map((item) => createItem(COLLECTIONS.cablePlans, item)));
  await Promise.all(internetPlans.map((item) => createItem(COLLECTIONS.internetPlans, item)));
  await Promise.all(comboPlans.map((item) => createItem(COLLECTIONS.comboPlans, item)));
  await Promise.all(liveUpdates.map((item) => createItem(COLLECTIONS.liveUpdates, item)));
  await Promise.all(areas.map((item) => createItem(COLLECTIONS.coveredAreas, item)));
}
