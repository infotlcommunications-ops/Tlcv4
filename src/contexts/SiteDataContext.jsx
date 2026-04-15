import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { COLLECTIONS, subscribeCollection, subscribeSettings } from '../services/firestoreService';
import { defaultSettings } from '../utils/demoData';

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [cablePlans, setCablePlans] = useState([]);
  const [internetPlans, setInternetPlans] = useState([]);
  const [comboPlans, setComboPlans] = useState([]);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [coveredAreas, setCoveredAreas] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const unsubs = [
      subscribeSettings((value) => {
        if (value) setSettings(value);
      }),
      subscribeCollection(COLLECTIONS.cablePlans, setCablePlans),
      subscribeCollection(COLLECTIONS.internetPlans, setInternetPlans),
      subscribeCollection(COLLECTIONS.comboPlans, setComboPlans),
      subscribeCollection(COLLECTIONS.liveUpdates, setLiveUpdates),
      subscribeCollection(COLLECTIONS.coveredAreas, setCoveredAreas),
      subscribeCollection(COLLECTIONS.enquiries, setEnquiries),
    ];

    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => {
      unsubs.forEach((unsub) => typeof unsub === 'function' && unsub());
      clearTimeout(timeout);
    };
  }, []);

  const value = useMemo(
    () => ({
      loading,
      settings,
      cablePlans,
      internetPlans,
      comboPlans,
      liveUpdates,
      coveredAreas,
      enquiries,
    }),
    [loading, settings, cablePlans, internetPlans, comboPlans, liveUpdates, coveredAreas, enquiries]
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
