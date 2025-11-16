# Todo App Backend

This is the backend API for the Todo application built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example` and configure your environment variables:
   - PORT: The port to run the server on (default: 5000)
   - MONGO_URI: MongoDB connection string
   - JWT_SECRET: Secret for JWT token signing

## Running Locally

```
npm run dev
```

The server will start on `http://localhost:5000`

## Deployment to Render

### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster:
   - Select "Shared" tier (free)
   - Choose AWS provider and a region near you
   - Leave other settings as default
   - Click "Create Cluster"
3. Wait for the cluster to be created (may take a few minutes)
4. Click "Connect" on your cluster
5. Select "Connect your application"
6. Choose "Node.js" as the driver and "4.0 or later" as the version
7. Copy the connection string (it will look like):
   ```
   mongodb+srv://<username>:<password>@cluster0.yourID.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```
8. Replace `<username>` and `<password>` with your actual database user credentials
9. Replace `myFirstDatabase` with your database name (e.g., `todoapp`)

### Step 2: Set up Database User

1. In MongoDB Atlas, go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" as the authentication method
4. Enter a username and password (save these for your connection string)
5. Select "Read and write to any database"
6. Click "Add User"

### Step 3: Configure Network Access

1. In MongoDB Atlas, go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

### Step 4: Update your `.env` file

For local development:
```
MONGO_URI=mongodb://localhost:27017/todoapp
```

For production deployment:
```
MONGO_URI=mongodb+srv://yourUsername:yourPassword@yourCluster.yourID.mongodb.net/todoapp?retryWrites=true&w=majority
```

### Step 5: Deploy to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com) and create an account
3. Create a new Web Service
4. Connect your GitHub repository
5. Set the following configuration:
   - Name: Your service name
   - Environment: Node
   - Build command: `npm install`
   - Start command: `node server.js`
   - Environment variables:
     - Add your `MONGO_URI` with your MongoDB Atlas connection string
     - Add your `JWT_SECRET` with a secure secret key

6. After deployment, Render will provide a URL for your API (e.g., `https://your-app-name.onrender.com`)

## API Endpoints

- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- GET `/api/tasks/:id` - Get a specific task
- PUT `/api/tasks/:id` - Update a task
- PATCH `/api/tasks/:id` - Partially update a task
- DELETE `/api/tasks/:id` - Delete a task

## CORS Configuration

The API is configured to accept requests from:
- http://localhost:5173 (local development)
- https://task8mern.netlify.app (production)

If you're using a different frontend URL, update the CORS configuration in `server.js`.

## Troubleshooting

### MongoDB Connection Issues

If you see errors like:
```
MongoAPIError: URI must include hostname, domain name, and tld
```

This means your `MONGO_URI` is not properly formatted. Make sure you're using the MongoDB Atlas connection string format:
```
mongodb+srv://username:password@cluster.yourID.mongodb.net/databaseName?retryWrites=true&w=majority
```

### CORS Issues

If you see CORS errors in your frontend, make sure your frontend URL is added to the CORS configuration in [server.js](file:///d:/React_prctise/ReactComponent/Assignments/assignment8/backend/server.js).