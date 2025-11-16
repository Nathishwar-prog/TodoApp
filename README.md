# Todo App Frontend

This is the frontend for the Todo application built with React and Vite.

## Features

- Modern React with hooks
- Responsive design
- Task management interface
- Priority and status tracking
- RESTful API integration
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- Git

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:5001/api
```

Create a `.env.production` file for production deployment:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 3. Running the Application

#### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

#### Build for Production

```bash
npm run build
```

This will create a `dist` folder with the production build.

#### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/                  # Source code
│   ├── services/         # API service functions
│   ├── components/       # React components
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── api.js            # Axios configuration
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── .env                  # Development environment variables
└── .env.production       # Production environment variables
```

## Development

### Components

The main component is `App.jsx` which handles:
- Task listing
- Task creation form
- Task status updates
- Task deletion

### Services

API calls are handled by the service functions in `src/services/taskService.js`:
- `fetchTasks()` - Get all tasks
- `createTask()` - Create a new task
- `updateTask()` - Update a task
- `patchTask()` - Partially update a task
- `deleteTask()` - Delete a task

### API Configuration

The API client is configured in `src/api.js` and uses the `VITE_API_URL` environment variable.

## Deployment to Netlify

### 1. Push to GitHub

Make sure your code is pushed to a GitHub repository.

### 2. Create Site on Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository

### 3. Configure Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 4. Environment Variables

Set the following environment variable in Netlify:
- `VITE_API_URL`: `https://your-backend-url.onrender.com/api`

## Customization

### Styling

Styles are defined in `src/App.css`. You can modify the CSS classes to change the appearance.

### API Endpoints

The API endpoints are defined in `src/services/taskService.js`. You can modify the paths if your backend API changes.

## Common Issues

### API Connection Errors

- Check that your backend server is running
- Verify the `VITE_API_URL` in your environment files
- Ensure CORS is properly configured on the backend

### Build Errors

- Make sure all dependencies are installed
- Check for syntax errors in your code

### Environment Variables Not Loading

- Ensure environment variables are prefixed with `VITE_`
- Restart the development server after changing environment files

# Todo App Backend

This is the backend API for the Todo application built with Node.js, Express, and MongoDB.

## Features

- RESTful API for task management
- MongoDB integration for data persistence
- CORS support for frontend communication
- Environment-based configuration
- Error handling middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
```

### 3. Running the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id` - Partially update a task
- `DELETE /api/tasks/:id` - Delete a task

### Health Check

- `GET /api/health` - Check if the backend is running

## Project Structure

```
backend/
├── controllers/      # Request handlers
│   └── taskController.js
├── middleware/       # Custom middleware
│   ├── errorHandler.js
├── models/           # MongoDB models
│   └── Task.js
├── routes/           # API routes
│   └── tasks.js
├── utils/            # Utility functions
│   └── db.js
├── server.js         # Entry point
└── .env              # Environment variables
```

## MongoDB Setup

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster

### 2. Database User Setup

1. In MongoDB Atlas, go to "Database Access"
2. Add a new database user
3. Grant read and write permissions

### 3. Network Access

1. In MongoDB Atlas, go to "Network Access"
2. Add your IP address or allow access from anywhere (0.0.0.0/0) for development

### 4. Connection String

Get your connection string from MongoDB Atlas:
```
mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

## Deployment to Render

### 1. Push to GitHub

Make sure your code is pushed to a GitHub repository.

### 2. Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository

### 3. Configure Settings

- **Name**: Choose a name for your service
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Environment Variables

Set the following environment variables in Render:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Your JWT secret
- `PORT`: 5000 (Render will automatically set this)

## Common Issues

### MongoDB Connection Failed

- Check your connection string format
- Verify username and password
- Ensure your IP is whitelisted in MongoDB Atlas

### CORS Errors

- Make sure your frontend URL is in the CORS configuration
- Check that the backend server is running

### Port Already in Use

- Change the PORT variable in your `.env` file
- Kill any processes using the port

## License

This project is licensed under the MIT License.

## License

This project is licensed under the MIT License.
