const express = require('express');
const mysql = require('mysql2'); // Using promises for cleaner async/await

const app = express();
const port = 5000;

// Database connection details (replace with your actual credentials)
const pool = mysql.createPool({
  // local
  host: '127.0.0.1',
  user: 'root',
  database: 'crophealth',
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Check connection
app.get('/', async (req, res) => {
  console.log('Success');
  return res.status(200).json({ message: 'Success', status: 'Ready' });
});

app.get('/sensors', async (req, res) => {
  try {
    const query = 'SELECT * FROM sensing_data';
    pool.query(query, (error, results) => {
      if (!results) {
        res.json({ status: 'Not Found!' });
      } else {
        res.json(results);
      }
    });
  } catch {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// example
app.get('/articles/:id', async (req, res) => {
  const query = 'SELECT * FROM artikel_batik WHERE id_artikel = ?';
  pool.query(query, [req.params.id], (error, results) => {
    if (!results[0]) {
      res.json({ status: 'Not Found!' });
    } else {
      res.json(results[0]);
    }
  });
});

// Get sensor data for a specific crop and date (replace with query params)
app.get('/sensors/:cropId/:date', async (req, res) => {
  const cropId = req.params.cropId;
  const date = req.params.date;

  try {
    const [rows] = pool.query(
      'SELECT * FROM sensing_data WHERE crop_id = ? AND date = ?',
      [cropId, date],
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'No sensor data found for this crop and date.' });
    }

    res.json(rows[0]); // Assuming you want only the first record (change for all data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
