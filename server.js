// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

app.use(cors());

const placeRouter = require('./routes/placeRouter');


const conn = require('./services/db');
conn.dbConnection();
// Middleware to parse JSON bodies
app.use(express.json());

// Use the placeRouter for all routes under /places
app.use('/places', placeRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
