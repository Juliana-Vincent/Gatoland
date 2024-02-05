document.getElementById("plusLinie").addEventListener("click", function() {
  const linie = document.getElementById("linie");
  const neueLinie = document.createElement("div");
  neueLinie.className = "margo";
  neueLinie.innerHTML = '<input type="text">';
  linie.appendChild(neueLinie);
});

var checkboxes = document.querySelectorAll('.tik');
var button = document.getElementById('submitButton');

checkboxes.forEach(ch => {
  ch.addEventListener('change', function() {
    var allChecked = Array.from(checkboxes).every(ch => ch.checked);
    button.disabled = !allChecked;
  });
});


const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '4chan',
  port: 5432,
});

app.post('/submit', async (req, res) => {
  const { username, email, phonenumber, kitten, coupons } = req.body;

  const result = await pool.query(
    'INSERT INTO gato (username, email, phonenumber, kitten, coupons) VALUES ($1, $2, $3, $4, $5)',
    [username, email, phonenumber, kitten, coupons]
  );

  if (!username || !email || !phonenumber || !kitten || !coupons) {
    return res.status(400).send('Missing data');
  }
  try {
    const result = await pool.query(
      'INSERT INTO gato (username, email, phonenumber, kitten, coupons) VALUES ($1, $2, $3, $4, $5)',
      [username, email, phonenumber, kitten, coupons]
    );
    res.send('Data submitted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
