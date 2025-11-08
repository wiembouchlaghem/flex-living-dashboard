Flex Living — Manager Dashboard Documentation

1. Project Overview

This project implements a Reviews Dashboard for Flex Living, allowing managers to:

View, filter, and approve guest reviews for properties.

Display approved reviews on the public property page.

Visualize property-level statistics (average rating, total reviews, approved reviews).

2. System Structure

Backend: Node.js + Express + MongoDB for fetching, normalizing, and storing reviews.

Frontend: React (Vite) for dashboard UI, review visualization, and filters.

3. Frontend Tech Stack

React.js (Vite) — UI framework

Axios — API communication

React Router DOM — Page routing

React Icons — Iconography

CSS3 — Responsive styling using Flex Living brand colors (green #174b43, beige tones)

4. Backend

Node.js + Express — REST API server

MongoDB + Mongoose — Review storage and queries

Dotenv — Environment variable management

CORS + JSON middleware — Structured and secure API responses

5. Design and Logic Decisions
   5.1 Backend

GET /api/reviews/hostaway: Fetches and normalizes reviews from a mocked Hostaway API.

PATCH /api/reviews/:id/approve: Approves a review for public display.

GET /api/reviews/approved: Returns only approved reviews.

GET /api/reviews/hostaway/stats/property: Computes per-property statistics.

All review fields are normalized (listingName, guestName, rating, publicReview, etc.).

5.2 Frontend

Dashboard:

Filterable and sortable table of reviews.

Displays property-level statistics (average rating, total reviews, approvals).

Approve buttons update the UI immediately and sync with the backend.

Property Page:

Shows approved reviews with star ratings, avatars, navigation arrows, and pagination.

5.3 UI/UX

Header and footer match Flex Living colors and branding.

Navbar smoothly transitions on scroll.

Components are modular and reusable for maintainability.

6. API Overview
   6.1 GET /api/reviews/hostaway

Fetches all Hostaway reviews.

Seeds mock data if the database is empty.

Response Example:

[
{
"_id": "1",
"listingName": "2B N1 A - Shoreditch",
"guestName": "Shane Finkelstein",
"rating": 10,
"publicReview": "Great stay!",
"submittedAt": "2020-08-21T22:45:14.000Z",
"approved": false
}
]

6.2 PATCH /api/reviews/:id/approve

Approves a review for public display.

Response Example:

{
"\_id": "1",
"listingName": "2B N1 A - Shoreditch",
"approved": true
}

6.3 GET /api/reviews/approved

Returns all approved reviews, optionally filtered by property.

6.4 GET /api/reviews/hostaway/stats/property

Returns statistics per property: average rating, total reviews, approved reviews.

7. Local Setup Instructions
   7.1 Backend
   cd backend
   npm install

Create .env file:

MONGO_URI=mongodb+srv://<your_connection_string>
PORT=4000

Start the server:

npm start

(Optional) Seed mock data:

curl -X POST http://localhost:4000/api/reviews/hostaway/seed

7.2 Frontend
cd frontend
npm install
npm run dev

Visit: http://localhost:5173

8. Google Reviews Exploration

Explored integration via Google Places API:

https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=name,rating,reviews&key={API_KEY}

Sandbox API key does not return the reviews field.

Documented but not implemented in this version.

9. Future Work

Dynamic integration of Google Cloud reviews.

Real-time notifications and tracking.

Improved dashboard pagination and filter options.

10.  Local Setup Instructions
* Backend
cd backend
npm install


Create a .env file:

MONGO_URI=<your_connection_string>
PORT=4000


Run the backend:

npm run dev


* seed mock data:

curl -X POST http://localhost:4000/api/reviews/hostaway/seed

* Frontend
cd frontend
npm install
npm run dev
