# Bicycle Store Frontend [Live Site](https://bicycle-store-04-1-client.vercel.app/)

## Project Overview
The **Bicycle Store** frontend is a responsive and user-friendly React application that enables customers to browse, search, and purchase bicycles. It also includes an admin dashboard for managing users, products, and orders.

## Live Demo
- Explore the live application here: **[Live URL](https://bicycle-store-04-1-client.vercel.app/)**
- Explore the backend here: **[GitHub URL](https://github.com/dear-mahmud-bd/cycle-store-server)**


## Features
- 🔑 **Authentication & Authorization** (JWT-based, Role-Based Access)
- 🏠 **Public Pages** (Home, All Bicycles, About, Bicycle Details)
- 🔍 **Search & Filtering** (By brand, category, price, and more)
- 🛒 **Order Management** (Cart, Checkout, Payment Integration)
- 📊 **Admin Dashboard** (Manage users, products, orders, sales dashboard)
- 🎨 **Modern UI** (Tailwind CSS, DaisyUI, Responsive Design)
- 🔥 **State Management** (Redux Toolkit, Redux Persist)
- 📢 **Notifications & Alerts** (React Toastify, SweetAlert2)

---

## Tech Stack 🛠️
- **React 18** – Component-based UI development
- **React Router** – Client-side routing
- **Redux Toolkit** – State management
- **Tailwind CSS & DaisyUI** – Styling and UI components
- **React Hook Form** – Form validation and handling
- **React Toastify & SweetAlert2** – User notifications and modals
- **JWT Decode** – Token decoding for authentication
- **TypeScript** – Strongly typed JavaScript
- **Vite** – Fast and optimized development build
- **ESLint & TypeScript ESLint** – Code linting and best practices

---

## Installation & Setup 🚀
### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn installed

### Clone the Repository
```bash
git clone https://github.com/dear-mahmud-bd/cycle-store-client.git
cd cycle-store-client
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Run the Development Server
```bash
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:5173/`.


## Project Structure 📂
```
📦 bicycle-store-frontend
 ┣ 📂 src
 ┃ ┣ 📂 components  # Reusable UI components
 ┃ ┣ 📂 pages       # Page-level components
 ┃ ┣ 📂 redux       # State management (Redux Toolkit)
 ┃ ┣ 📂 routes      # Route configuration
 ┃ ┣ 📂 utils       # Helper functions
 ┃ ┣ 📜 App.tsx     # Main application entry
 ┃ ┣ 📜 main.tsx    # React DOM render
 ┃ ┣ 📜 index.css   # Global styles
 ┣ 📜 .env          # Environment variables
 ┣ 📜 package.json  # Dependencies & scripts
 ┣ 📜 tsconfig.json # TypeScript config
 ┣ 📜 vite.config.ts# Vite config
 ┣ 📜 README.md     # Project documentation
```


## Scripts 📜
| Command         | Description                                      |
|----------------|--------------------------------------------------|
| `npm run dev`  | Start the development server                    |
| `npm run build`| Build the project for production                |
