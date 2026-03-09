# UCab – Step-by-Step Instructions

This document provides all instructions and external tasks required to run the UCab cab booking platform.

---

## Prerequisites (External Setup)

Before running the application, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node -v` and `npm -v`

2. **MongoDB**
   - Download Community Server: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - If using local MongoDB: ensure the service is running (`mongod`)

3. **Git** (optional, for version control)
   - Download: https://git-scm.com/

---

## Step 1: Install Dependencies

### Frontend

```bash
cd C:\Users\arham\Asad Ali\Ucab2
npm install
```

### Backend

```bash
cd C:\Users\arham\Asad Ali\Ucab2\server
npm install
```

---

## Step 2: Configure Environment Variables

### Backend (.env)

Create or update `server/.env` with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ucab
JWT_SECRET=ucab_super_secret_jwt_key_2025
JWT_EXPIRE=7d
```

**If using MongoDB Atlas:**
- Replace `MONGO_URI` with your Atlas connection string
- Example: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ucab`

### Frontend (.env)

Create `C:\Users\arham\Asad Ali\Ucab2\.env` (optional):

```
VITE_API_URL=http://localhost:5000/api
```

If not set, the app defaults to `http://localhost:5000/api`.

---

## Step 3: Start MongoDB (Local Only)

If using local MongoDB:

**Windows (PowerShell):**
```powershell
# Start MongoDB service (if installed as service)
net start MongoDB

# Or run mongod manually
mongod --dbpath "C:\data\db"
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
mongod --dbpath /data/db
```

---

## Step 4: Seed the Database

Run the seed script to create sample users and data:

```bash
cd C:\Users\arham\Asad Ali\Ucab2\server
npm run seed
```

**Sample login credentials:**
- **Rider:**  rider@ucab.com / rider123
- **Driver:** driver@ucab.com / driver123
- **Admin:**  admin@ucab.com / admin123

---

## Step 5: Start the Backend Server

```bash
cd C:\Users\arham\Asad Ali\Ucab2\server
npm start
```

You should see:
```
✅ MongoDB connected
🚀 UCab Server running on http://localhost:5000
```

Keep this terminal open.

---

## Step 6: Start the Frontend (Development)

Open a **new terminal**:

```bash
cd C:\Users\arham\Asad Ali\Ucab2
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

---

## Step 7: Access the Application

1. Open a browser and go to: **http://localhost:5173**
2. Use the sample credentials from Step 4 to log in as Rider, Driver, or Admin
3. Explore: Book rides, manage cabs, view dashboards, etc.

---

## Quick Reference – Run Order

| Order | Command | Location |
|-------|---------|----------|
| 1 | `npm run seed` | server/ |
| 2 | `npm start` | server/ |
| 3 | `npm run dev` | project root |

---

## Production Build

### Frontend

```bash
cd C:\Users\arham\Asad Ali\Ucab2
npm run build
```

Output: `dist/` folder. Deploy to any static host (Vercel, Netlify, etc.).

### Backend

```bash
cd C:\Users\arham\Asad Ali\Ucab2\server
npm start
```

Deploy to services like Railway, Render, or a VPS.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **MongoDB connection failed** | Ensure MongoDB is running; check `MONGO_URI` in `server/.env` |
| **CORS errors** | Backend allows `localhost:5173` and `5174`. Add your frontend URL to CORS in `server/server.js` if needed |
| **401 Unauthorized** | Log in again; token may have expired. Clear localStorage and re-login |
| **Port already in use** | Change `PORT` in `server/.env` or kill the process using the port |

---

## Project Structure

```
Ucab2/
├── src/                    # React frontend
│   ├── api/               # Axios API client
│   ├── components/        # Reusable UI components
│   ├── context/           # Auth & Data context (API integration)
│   └── pages/             # Route pages
├── server/                # Node.js backend
│   ├── models/            # Mongoose models (User, Cab, Booking)
│   ├── routes/            # API routes (auth, cabs, bookings, users)
│   └── middleware/        # JWT auth middleware
├── instructions.md        # This file
└── package.json
```

---

## Summary Checklist

- [ ] Node.js and MongoDB installed
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] `server/.env` created with PORT, MONGO_URI, JWT_SECRET
- [ ] MongoDB running (local or Atlas)
- [ ] Database seeded (`npm run seed` in server/)
- [ ] Backend started (`npm start` in server/)
- [ ] Frontend started (`npm run dev` in project root)
- [ ] Application accessible at http://localhost:5173
