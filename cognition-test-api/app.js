const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { resolve } = require('path');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'test_user',
  host: 'localhost',
  database: 'cognitionTest',
  password: 'test_password',
  port: 5432,
});

app.post('/test', async (req, res) => {
  try {
    console.log('test');
    console.log(req.body);
    const data = req.body;
    console.log(data)
    const { rows } = await pool.query('INSERT INTO test_records (data) VALUES ($1)', [data]);
    res.status(200).json({ message: 'Data added successfully', data: rows });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'An error occurred', error: err });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});