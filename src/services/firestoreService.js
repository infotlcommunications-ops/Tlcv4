import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export const COLLECTIONS = {
  cablePlans: 'cablePlans',
  internetPlans: 'internetPlans',
  comboPlans: 'comboPlans',
  liveUpdates: 'liveUpdates',
  coveredAreas: 'coveredAreas',
  enquiries: 'enquiries',
  siteSettings: 'siteSettings',
};

export function subscribeCollection(name, callback) {
  const q = query(collection(db, name), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
  });
}

export function subscribeSettings(callback) {
  return onSnapshot(doc(db, COLLECTIONS.siteSettings, 'main'), (snapshot) => {
    callback(snapshot.exists() ? snapshot.data() : null);
  });
}

export async function createItem(name, payload) {
  return addDoc(collection(db, name), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateItem(name, id, payload) {
  return updateDoc(doc(db, name, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItem(name, id) {
  return deleteDoc(doc(db, name, id));
}

export async function saveSettings(payload) {
  return setDoc(
    doc(db, COLLECTIONS.siteSettings, 'main'),
    { ...payload, updatedAt: serverTimestamp() },
    { merge: true }
  );
}
