const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

const pool = new Pool({
    user: 'admin', // replace with your database username
    host: 'localhost',
    database: 'meal_planner',
    password: 'password', // replace with your database password
    port: 5432,
});

// Example endpoint to get recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
