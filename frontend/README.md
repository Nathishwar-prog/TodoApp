# Todo App Frontend

This is the frontend for the Todo application built with React and Vite.

## Deployment to Netlify

To deploy this application to Netlify:

1. Push this frontend directory to a GitHub repository
2. Connect the repository to Netlify
3. Set the build settings in Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Netlify will automatically detect and deploy the functions in `netlify/functions`

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

The app will be available at http://localhost:5173

## Project Structure

- `src/` - React components and services
- `netlify/functions/` - Netlify serverless functions
- `dist/` - Production build output