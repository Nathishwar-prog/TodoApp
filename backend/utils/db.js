const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log('Attempting to connect with URI:', uri ? 'URI provided' : 'URI not provided');
  
  if (!uri) {
    throw new Error('MONGO_URI not set in environment variables. Please set MONGO_URI in Render dashboard.');
  }
  
  // Log the URI format for debugging (masking sensitive info)
  console.log('URI format check - starts with mongodb+srv:', uri.startsWith('mongodb+srv://'));
  console.log('URI format check - contains mongodb.net:', uri.includes('.mongodb.net'));
  
  // Validate URI format for MongoDB Atlas
  if (uri.startsWith('mongodb+srv://')) {
    if (!uri.includes('.mongodb.net')) {
      throw new Error('Invalid MongoDB Atlas URI format. Must include .mongodb.net domain. Current URI: ' + uri.substring(0, Math.min(uri.length, 50)) + '...');
    }
    // Check for proper structure: mongodb+srv://username:password@cluster.mongodb.net/dbname
    const uriParts = uri.split('@');
    if (uriParts.length < 2) {
      throw new Error('Invalid MongoDB Atlas URI format. Missing @ separator. Current URI: ' + uri.substring(0, Math.min(uri.length, 50)) + '...');
    }
    const hostPart = uriParts[uriParts.length - 1]; // Last part after @ should contain host
    if (!hostPart.includes('.mongodb.net')) {
      throw new Error('Invalid MongoDB Atlas URI format. Host part must contain .mongodb.net. Current host part: ' + hostPart.substring(0, Math.min(hostPart.length, 30)) + '...');
    }
  }
  
  try {
    console.log('Attempting MongoDB connection...');
    await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full URI (first 100 chars):', uri ? uri.substring(0, Math.min(100, uri.length)) : 'undefined');
    
    // Provide specific guidance for authentication errors
    if (error.message.includes('auth') || error.message.includes('authentication')) {
      console.error('Authentication failed. Please check:');
      console.error('1. Username in connection string is correct');
      console.error('2. Password in connection string is correct');
      console.error('3. User exists in MongoDB Atlas Database Access');
      console.error('4. Password contains special characters that need URL encoding');
      console.error('5. User has proper permissions (Read and write to any database)');
    }
    
    throw error;
  }
};

module.exports = connectDB;