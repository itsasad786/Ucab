# UCab – Cab Booking Platform

A full-stack cab booking web application with separate panels for **Riders**, **Drivers**, and **Admin**. Built with React and Vite.

![UCab](https://img.shields.io/badge/UCab-Cab%20Booking-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite)

---

## Features

- **Rider Panel**
  - Register and login
  - Book rides with pickup, drop, and date
  - View ride history and status updates
  - Personal dashboard and profile

- **Driver Panel**
  - Register and login
  - View assigned ride requests
  - Accept or reject ride requests
  - Mark rides as completed
  - Track earnings and ride history

- **Admin Dashboard**
  - User management (view, edit, delete)
  - Booking management
  - Cab fleet management (add, edit, delete)
  - Platform overview and statistics

- **Authentication**
  - Role-based access (Rider, Driver, Admin)
  - Secure login and registration
  - Session persistence

- **Synchronization**
  - All panels stay in sync
  - Real-time status updates across Rider, Driver, and Admin views

---

## Tech Stack

- **Frontend:** React 19, Vite 7, React Router, Lucide Icons
- **State & Auth:** React Context (AuthContext, DataContext)
- **Styling:** Custom CSS with CSS variables
- **Data Persistence:** Browser local storage

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ucab.git
cd ucab

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Demo Credentials

| Role  | Email           | Password  |
|-------|-----------------|-----------|
| Rider | rider@ucab.com  | rider123  |
| Driver| driver@ucab.com | driver123 |
| Admin | admin@ucab.com  | admin123  |

---

## Project Structure

```
ucab/
├── src/
│   ├── api/              # API utilities
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Sidebar, shared components
│   │   └── landing/      # Hero, Footer, CTA, etc.
│   ├── context/          # Auth & data context
│   ├── pages/            # Route pages
│   │   ├── admin/        # Admin dashboard & management
│   │   ├── auth/         # Login & register
│   │   ├── driver/       # Driver panel
│   │   └── rider/        # Rider panel
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## License

MIT
