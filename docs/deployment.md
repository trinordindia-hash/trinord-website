# Deployment

- Frontend: deploy `frontend` to Vercel (set the Vercel project root directory to `frontend`). `frontend/vercel.json` rewrites page requests to the SPA entry point so React Router routes continue to work after refresh or direct navigation. Set `VITE_API_URL` only when the API is hosted on a different origin; proxy `/api` through the frontend host or configure CORS.
- Backend: deploy `backend` to Render as a Node service. Use `npm start`.
- MongoDB: use MongoDB Atlas and set `MONGODB_URI`.
- Set `JWT_SECRET`, `CORS_ORIGINS`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
- Run `npm run seed` once after creating the database and credentials.
- Configure Cloudinary credentials for production image uploads. The current public catalogue uses replaceable brochure assets and the API content routes are ready for Cloudinary URLs.
