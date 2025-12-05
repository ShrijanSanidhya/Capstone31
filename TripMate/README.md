# TripMate - Travel Planning & Management Platform

> Your personal travel companion for seamless trip planning and collaboration

🌐 **Live Demo**: [https://capstone31.vercel.app](https://capstone31.vercel.app)  
🔗 **Backend API**: [https://tripplanner-8pge.onrender.com](https://tripplanner-8pge.onrender.com)

---

## 📋 Proposal

### Problem Statement

Modern travelers face several challenges when planning and managing their trips:
- **Scattered Information**: Trip details are spread across emails, notes, and different apps
- **Lack of Organization**: No centralized platform to manage multiple trips with categorization
- **Budget Tracking**: Difficulty in tracking and managing travel budgets across different trips
- **Limited Collaboration**: Hard to share travel experiences and get recommendations from other travelers
- **No Trip History**: Missing a consolidated view of past, current, and upcoming trips

### Proposed Solution

**TripMate** is a comprehensive travel planning and management platform that solves these problems by providing:

1. **Centralized Trip Management**: Create, organize, and manage all your trips in one place
2. **Smart Categorization**: Classify trips by type (Business, Leisure, Family, Adventure)
3. **Budget Planning**: Set and track budgets for each trip
4. **Advanced Search & Filters**: Quickly find trips using powerful filtering options
5. **Community Reviews**: Share experiences and read reviews from other travelers
6. **Trip Timeline**: Manage trips with clear start and end dates
7. **Personal Dashboard**: Get insights into travel statistics and upcoming trips

### Target Users

- **Frequent Travelers**: Business professionals who travel regularly
- **Vacation Planners**: Families planning leisure and adventure trips
- **Travel Enthusiasts**: People who love to explore new destinations
- **Digital Nomads**: Remote workers managing travel schedules
- **Travel Agencies**: Organizations managing client trips

### Key Features

#### Trip Management (Full CRUD)
- Create detailed trip plans with destinations, dates, and budgets
- Update trip information as plans change
- Delete trips that are cancelled
- View comprehensive trip details and timelines

#### Review System (Full CRUD)
- Write reviews and ratings for trips
- Share travel experiences with the community
- Edit your reviews
- Delete reviews when needed

#### Advanced Search & Filtering
- **Search**: Find trips by destination name
- **Filter by Type**: Business, Leisure, Family, Adventure
- **Budget Range**: Filter trips within specific budget ranges
- **Duration**: Filter by trip length (days)
- **Tags**: Categorize and search by custom tags
- **Sorting**: Sort by date (newest/oldest) or budget (high/low)

#### User Features
- Secure authentication and authorization
- Personal profile and statistics
- User-specific trip management
- Protected routes and data privacy

---

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **date-fns** - Date formatting and manipulation
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps & Hosting
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **Git** - Version control

---

## ✨ Features Overview

### Core Functionality

#### 1. **Trips Resource (Full CRUD)**
- ✅ **CREATE**: Add new trips with full details
- ✅ **READ**: View all trips with pagination (10 per page)
- ✅ **UPDATE**: Edit trip information
- ✅ **DELETE**: Remove trips
- 📊 **Pagination**: Navigate through large trip lists
- 🔍 **Search**: Find trips by destination
- 🎯 **Filter**: Multiple filter options (type, budget, duration, tags)
- 📈 **Sort**: Order by date or budget

#### 2. **Reviews Resource (Full CRUD)**
- ✅ **CREATE**: Write trip reviews with ratings (1-5 stars)
- ✅ **READ**: View all reviews for a trip
- ✅ **UPDATE**: Edit your reviews
- ✅ **DELETE**: Remove your reviews
- 🔒 **Authorization**: Only review owners can edit/delete their reviews
- 🚫 **Validation**: Prevent duplicate reviews per user per trip

#### 3. **Authentication & Authorization**
- 🔐 User registration and login
- 🎫 JWT-based authentication
- 🛡️ Protected routes and resources
- 👤 User-specific data access

---

## 🗄️ Database Schema

### Trip Model
```javascript
{
  userId: ObjectId (ref: User),
  destination: String (required),
  startDate: Date (required),
  endDate: Date (required),
  budget: Number (required),
  type: String (enum: ['Business', 'Leisure', 'Family', 'Adventure']),
  tags: [String],
  description: String,
  timestamps: true
}
```

### Review Model
```javascript
{
  trip: ObjectId (ref: Trip, required),
  user: ObjectId (ref: User, required),
  rating: Number (required, min: 1, max: 5),
  comment: String (required),
  timestamps: true,
  unique: [trip, user] // Prevents duplicate reviews
}
```

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

---

## 🔌 API Endpoints

### Trips
- `POST /api/trips` - Create new trip
- `GET /api/trips` - Get all trips (with filters, pagination, sorting)
- `GET /api/trips/:id` - Get single trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

**Query Parameters**:
- `search` - Search by destination
- `type` - Filter by trip type
- `minBudget`, `maxBudget` - Budget range
- `minDuration`, `maxDuration` - Duration range (days)
- `tags` - Filter by tags (comma-separated)
- `sort` - Sort field (e.g., `-createdAt`, `budget`)
- `page`, `limit` - Pagination

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/trip/:tripId` - Get all reviews for a trip
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd TripMate/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd TripMate/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Update API URL** (if needed) in `src/services/api.js`:
   ```javascript
   baseURL: 'http://localhost:5001/api'  // For local development
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

---

## 📸 Screenshots & Demo

Visit the live application: **[https://capstone31.vercel.app](https://capstone31.vercel.app)**

### Test the Application
1. Open the hosted frontend
2. Open Browser DevTools → Network → Fetch/XHR
3. Register a new account or login
4. Create a trip and observe API calls
5. Add reviews, filter trips, and test all features
6. Verify API responses from the backend

---

## 🎯 Evaluation Criteria Met

### ✅ Backend Functionality
- **2 CREATE operations**: Trips, Reviews
- **3 READ operations**: Trips (list), Trips (single), Reviews
- **2 UPDATE operations**: Trips, Reviews
- **2 DELETE operations**: Trips, Reviews
- **Pagination**: Query params `page` and `limit`
- **Searching**: Regex search on destination
- **Sorting**: By date and budget
- **Filtering**: Type, budget range, duration, tags

### ✅ Hosting
- Frontend: Deployed on Vercel
- Backend: Deployed on Render
- Database: MongoDB Atlas

### ✅ Documentation
- README.md with proposal ✓
- Hosted URLs clearly mentioned ✓
- Problem statement defined ✓

---

## 🤝 Contributing

This project was developed as a capstone project for travel management.

---

## 📄 License

This project is developed for educational purposes.

---

## 👨‍💻 Author

**Shrijan Sanidhya**

---

## 🙏 Acknowledgments

- Lucide Icons for beautiful UI icons
- MongoDB for flexible database solution
- Vercel and Render for seamless deployment
