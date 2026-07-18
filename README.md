# Music Library App

React app split into two parts (main app + music library) connected via Module Federation. Fetches songs from iTunes Search API, has filter/sort/group, add/delete song, and role-based login (admin/user).

## Live Links
- Main App: https://fluffy-pika-9e723b.netlify.app
- Music Library (remote): https://astonishing-seahorse-d2decf.netlify.app

## Demo Login
No real backend for auth, just a mock JWT. On login screen:
- Admin - can add and delete songs
- User - can only view/filter/sort/group

## Run Locally
Two terminals needed.

Terminal 1:
cd music-library
npm install
npm run build
npm run preview
Runs on localhost:5001. Must use preview (not dev), federation needs the built remoteEntry.js.

Terminal 2:
cd main-app
npm install
npm run dev
Open the link, login, music library loads inside main app.

## Deployment
Both apps in one repo, deployed as 2 separate Netlify sites.
1. Deployed music-library first (base dir music-library, build npm run build, publish dir music-library/dist)
2. Copied its live remoteEntry.js URL into main-app's vite.config.js
3. Deployed main-app same way (base dir main-app, publish dir main-app/dist)
4. Added _headers file in music-library/public with CORS headers, since remote loads from a different domain

## Micro Frontend
music-library exposes MusicLibrary.jsx using @originjs/vite-plugin-federation, generating remoteEntry.js on build. main-app lazy loads it using React lazy() and Suspense.

## Role-Based Auth
main-app has a mock JWT - login base64 encodes role/sub/iat into a token, saved in localStorage, read back by AuthContext. Role is passed to the remote as a plain prop (isAdmin). Inside music-library, add form and delete buttons only render when isAdmin is true.

## Data
Songs come live from iTunes Search API via a useSongsQuery hook (React Query). Fields like trackName/artistName/collectionName/releaseDate get mapped to title/artist/album/year.

Add/delete uses MSW to fake a /songs POST and DELETE endpoint in the browser (iTunes API is read-only). Added/deleted songs are tracked separately and merged with iTunes results, updating without page refresh (cache-update-on-success approach).

## Tradeoffs
Used prop-passing for auth instead of a shared auth module - fine for 2 apps, wouldn't scale to more remotes. Used cache invalidation over optimistic updates for simplicity. With more time: real backend for persistence, error handling if remote fails to load, shared styling between apps.