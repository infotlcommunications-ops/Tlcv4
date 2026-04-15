# BeigeNet ISP React Web App

A full React.js ISP website with:
- Public customer website
- Secure Firebase admin login
- Firestore realtime updates
- CRUD dashboard for plans, updates, areas, and settings
- Firestore-stored enquiries
- Beige-themed responsive UI

## Tech Stack
- React + Vite
- React Router
- Firebase Authentication
- Firebase Firestore

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Firebase
Create a `.env` file using `.env.example` and paste your Firebase config.

### 3. Enable Firebase products
In Firebase Console:
- Enable **Authentication > Email/Password**
- Enable **Firestore Database** in production or test mode
- Optional: enable **Hosting** for deployment

### 4. Create admin user
Create your admin email/password in Firebase Authentication.
Use that email and password on `/admin-login`.

### 5. Run locally
```bash
npm run dev
```

### 6. Build
```bash
npm run build
```

### 7. Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Firestore Collections
- cablePlans
- internetPlans
- comboPlans
- liveUpdates
- coveredAreas
- enquiries
- siteSettings/main

## Where to edit branding
Open Admin Dashboard > Site Settings.
You can change business name, logo URL, hero text, support info, and address.

## Realtime behavior
All public pages subscribe using Firestore `onSnapshot`, so changes in admin appear instantly for visitors.

## Recommended Firestore Rules (starter)
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /enquiries/{document=**} {
      allow create, read: if true;
    }

    match /siteSettings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /{collection}/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Notes
- Use the **Seed Demo Data** button inside admin overview after first login.
- For production, tighten Firestore security rules further as needed.
