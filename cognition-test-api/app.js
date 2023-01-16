const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { resolve } = require('path');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
});

app.use(bodyParser.json());

const pool = new Pool({
  user: 'lucas',
  host: 'localhost',
  database: 'cognitionTest',
  password: 'lucas',
  port: 5432,
});

app.post('/submit_test_records', async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query('INSERT INTO test_records (user_id, errorscount, triescount, test_time_in_secs, participated_on_date) VALUES ($1, $2, $3, $4, $5)', Object.values(data));
    res.status(200).json({ message: 'Data added successfully', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err });
  }
});

app.listen(3333, () => {
  console.log('Server running on port 3333');
});