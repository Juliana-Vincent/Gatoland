const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '4chan',
  port: 5432,
});

app.use(express.static('gatoland'));
app.post('/submit', async (req, res) => {
  const { username, email, phonenumber, kitten, coupons } = req.body;

  if (!username || !email || !phonenumber || !kitten || !coupons) {
    return res.status(400).send('Missing data');
  }
  try {
    const result = await pool.query(
      'INSERT INTO gato (username, email, phonenumber, kitten, coupons) VALUES ($1, $2, $3, $4, $5)',
      [username, email, phonenumber, kitten, coupons]
    );
    res.redirect('end.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});