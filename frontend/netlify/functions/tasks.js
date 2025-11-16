// Netlify function for tasks API - ONLY for local development when backend is not available
// When deployed to Netlify, this should NOT be used if you have a separate backend

exports.handler = async (event, context) => {
  // Return a message indicating this is only for local development
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ 
      message: 'This is a placeholder API for local development only. In production, please use your deployed backend.',
      tasks: [
        {
          _id: '1',
          title: 'Sample Task 1',
          description: 'This is a sample task',
          priority: 'Medium',
          status: 'Pending',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Sample Task 2',
          description: 'This is another sample task',
          priority: 'High',
          status: 'Completed',
          createdAt: new Date().toISOString()
        }
      ]
    })
  };
};