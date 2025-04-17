import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();

dotenv.config();

// Middleware setup
app.use(cors({
  origin: process.env.frontendUrl,
  credentials: true
}));
app.use(bodyParser.json());

// Route setup
app.use('/api', router);

// Test route
app.get('/', (req, res) => res.send('Server is running'));


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
