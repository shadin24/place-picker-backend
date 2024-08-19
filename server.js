

const express = require('express');
const app = express();
const port = 3000;

const placeRouter = require('./routes/placeRouter');


const conn = require('./services/db');

app.use(express.json());


app.use('/places', placeRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
