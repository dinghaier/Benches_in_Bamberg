# Benches in Bamberg
Benches in Bamberg is an interactive web map for discovering public benches in Bamberg. 
Users can explore benches on a Mapbox map, filter benches by type and location features, view detailed bench information, and submit community reviews with ratings.

## Features
- Interactive Mapbox map
- Public bench data from OpenStreetMap / Overpass Turbo
- Bamberg boundary, water areas and green spaces as GeoJSON layers
- Search by inscription or material
- Filters for backrest, material, near water and near green spaces
- Bench detail panel with material, inscription and reviews
- Review submission with rating
- Express backend with local JSON storage

## Installation
1. Clone the repository:
`git clone https://github.com/dinghaier/Benches_in_Bamberg.git`

2. Move into the project folder:
`cd Benches_in_Bamberg`

3. Install all dependencies:
`npm install`

4. Create a `.env` file in the project root and add:
`VITE_MAPBOX_TOKEN = mapbox_public_token；`

## Running the Project
This project needs two terminals.

1. Terminal 1 - Frontend
`npm run dev`

The frontend will be available at: http://localhost:5173
Open http://localhost:5173 in browser.

2. Terminal 2 - Backend
`node server/server.js`

The backend will run at: http://localhost:3000
