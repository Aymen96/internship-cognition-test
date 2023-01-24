var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'cognitionTest',
  password: 'root',
  port: 5432,
});

/* POST test records. */
router.get('/test_records', async (req, res, next) => {
  const { rows } = await pool.query('SELECT * FROM public.test_records ORDER BY record_id ASC ');
  res.status(200).json({ data: rows });
});

router.post('/submit_test_records', async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query('INSERT INTO test_records (user_id, errorscount, triescount, test_time_in_secs, participated_on_date) VALUES ($1, $2, $3, $4, $5)', Object.values(data));
    res.status(200).json({ message: 'Data added successfully', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err });
  }
});

module.exports = router;