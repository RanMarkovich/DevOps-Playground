# Test Automation Platform

A simple web application for test automation and DevOps integration. This platform allows users to manage test automation, create test plans, and integrate with CI/CD pipelines.

## Features

- User authentication (login and registration)
- Dashboard for test management
- Backend API with MongoDB database
- NextJS frontend

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Express.js with Node.js
- **Database**: MongoDB
- **Authentication**: JWT

## Project Structure

```
test-automation-platform/
├── backend/                  # Backend API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   └── server.js         # Express app
│   └── package.json          # Backend dependencies
├── prisma/                   # Prisma ORM
│   └── schema.prisma         # Database schema
├── src/                      # Frontend (Next.js)
│   ├── app/                  # Next.js App Router
│   │   ├── dashboard/        # Dashboard page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   └── page.tsx          # Home page
├── .env                      # Environment variables
├── package.json              # Frontend dependencies
└── README.md                 # Project documentation
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas connection)

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd test-automation-platform
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install
npm install next react react-dom  # Make sure Next.js and React are installed

# Install backend dependencies
cd backend
npm install
cd ..
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="mongodb://localhost:27017/test-automation-db"
JWT_SECRET="your-secret-key-for-jwt-authentication"
PORT=5000
```

4. Generate Prisma client
```bash
# Copy the .env file to the backend directory
cp .env backend/.env

# Generate Prisma client in the backend directory
cd backend
npx prisma generate
cd ..
```

## Running the Application

1. Start MongoDB (if using local MongoDB)
```bash
# Create a data directory for MongoDB (if it doesn't exist)
mkdir -p ~/data/db

# Start MongoDB with the custom data directory
mongod --dbpath ~/data/db

# Alternatively, you can use the default location (/data/db) with sudo
# sudo mkdir -p /data/db
# sudo chown -R `id -un` /data/db
# mongod
```

2. Start the backend server
```bash
cd backend
npm run dev
```

3. Start the frontend application (in a new terminal)
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Testing

### Manual Testing
1. Register a new user account
2. Log in with your credentials
3. Explore the dashboard

### Automated Testing
For automated testing, you can use tools like:
- Jest for unit tests
- Cypress for E2E tests
- Postman for API testing

## Deployment

### Local Deployment
- Frontend: `npm run build && npm start`
- Backend: `npm start`

### Cloud Deployment
The application can be deployed to:
- Vercel (frontend)
- Heroku/Railway/Render (backend)
- MongoDB Atlas (database)

## License

[MIT](LICENSE) 