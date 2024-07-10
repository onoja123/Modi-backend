import http from 'http';
import app from './app'

require('dotenv').config();

import connectToDatabase from './config/connect';


const port = process.env.PORT || 3000;


const server = http.createServer(app);


// Connect to MongoDB and start the server
connectToDatabase()
  .then(() => {
    console.log('MongoDB connected');
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err: any) => {
    console.error('Failed to connect to MongoDB:', err);
    console.error('Failed to start server:', err);
});