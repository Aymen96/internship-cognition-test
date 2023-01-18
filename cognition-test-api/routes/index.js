var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'lucas',
  host: 'localhost',
  database: 'cognitionTest',
  password: 'lucas',
  port: 5432,
});

/* POST test records. */
router.get('/test_records', function(req, res, next) {
  res.status(200).json({ message : 'This is home page' });
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