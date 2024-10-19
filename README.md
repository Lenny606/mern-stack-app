# MERN Stack App

This is a MERN (MongoDB, Express, React, Node.js) stack application. The frontend is built with React using Vite as the build tool, and includes various additional libraries for UI components and state management.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running (for the backend)

### Installation

1. Clone the repository:
   git clone [your-repo-link]
   cd mern-stack-app

2. Install backend dependencies:
   npm install

3. Install frontend dependencies:
   cd frontend
   npm install

## Running the Application

To run both the frontend and backend concurrently:

npm run dev

This command should be run from the root directory of the project.

## Frontend Setup

The frontend of this application was set up using Vite. Here are the steps that were taken:

1. Create a new Vite project:
   npm create vite@latest .
   Follow the prompts to set up a React project.

2. Install additional dependencies:
   npm install react-router-dom
   npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
   npm i @chakra-ui/icons
   npm i react-icons
   npm i zustand
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
3. npm i @tanstack/react-query  - 

## Packages Used

- react-router-dom: For handling routing in the React application.
- @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion: Chakra UI component library and its peer dependencies.
- @chakra-ui/icons: Icon set for Chakra UI.
- react-icons: Popular icon library for React.
- lucide-react
- zustand: Light-weight state management library.
- passport
- passport-local
- express-session
- express-flash
- bcrypt
- connect-mongo
- npm i react-turnstile (cloudflare captcha)

## Project Structure

mern-stack-app/
├── backend/
│   └── ... (backend files)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── package.json
└── README.md

## Scripts

- npm run dev: Runs both the frontend and backend in development mode.
- npm run start: Runs both the frontend and backend in prod mode.
- npm run build


## Acknowledgments

- Vite
- React
- Chakra UI
- Zustand