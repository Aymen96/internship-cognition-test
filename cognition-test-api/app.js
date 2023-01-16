const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_username',
  host: 'your_hostname',
  database: 'your_dbname',
  password: 'your_password',
  port: 5432,
});

app.post('/test', async (req, res) => {
  try {
    const { data } = req.body;
    const { rows } = await pool.query('INSERT INTO test_table (data) VALUES ($1)', [data]);
    res.status(200).json({ message: 'Data added successfully', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});