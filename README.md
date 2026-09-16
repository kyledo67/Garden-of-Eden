# Garden of Eden

**Garden of Eden** is a website designed and developed for the Regionals Webmaster competition alongside 2 friends. It won 3rd in regionals and advanced to state. The prompt was to make a vegetarian restaurant that incorporates a farm-to-table approach.

## Project Goals
- Make a cool website.
- Emphasize the importance of biodiversity and sustainable food systems.
- Simulate a real-world restaurant experience through visual design and functionality.

## Project structure

- `frontend/` — React and Vite single-page application, styles, and client-side interactions.
- `backend/` — Node HTTP endpoints for the chatbot and contact form. Both are intentionally safe placeholders: chat reports that it is not configured and contact submissions are discarded.

## Setup

Run the frontend from `frontend/`:

```sh
npm install
npm run dev
```

Optionally run the placeholder API from `backend/` in another terminal:

```sh
npm run dev
```

Copy `frontend/.env.example` or `backend/.env.example` when configuration is needed. The API key and contact recipient are intentionally blank.

The frontend development server proxies `/api` requests to `http://localhost:3001`.
