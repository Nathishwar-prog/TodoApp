// Netlify function for tasks API
// This is a simplified version - in a real deployment, you would connect to a database

const tasks = [
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
];

exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters, body } = event;
  
  // Simple routing based on HTTP method and path
  if (httpMethod === 'GET' && path.endsWith('/api/tasks')) {
    // Return all tasks
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(tasks)
    };
  }
  
  if (httpMethod === 'POST' && path.endsWith('/api/tasks')) {
    // Create a new task
    const newTask = JSON.parse(body);
    newTask._id = String(tasks.length + 1);
    newTask.createdAt = new Date().toISOString();
    tasks.push(newTask);
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Task created', task: newTask })
    };
  }
  
  // Handle other routes...
  
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ error: 'Route not found' })
  };
};