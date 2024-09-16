const fs = require('fs');
const { Pool } = require('pg');

// Set up the PostgreSQL connection
const pool = new Pool({
    user: 'mealplanner_fyzl_user', // Replace with your actual PostgreSQL username
    host: 'localhost',
    database: 'mealplanner',
    password: '523Yon4hByLawzK5B4RhaP5CGmihCuDg', // Replace with your actual PostgreSQL password
    port: 5432,
});

// Read the JSON file
fs.readFile('data/recipes.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const recipes = JSON.parse(data);

    // Insert each recipe into the database
    for (const recipe of recipes) {
        const query = `
            INSERT INTO recipes (title, image, ready_in_minutes, ingredients, meal_type, description, directions)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `;
        const values = [
            recipe.title,
            recipe.image,
            recipe.readyInMinutes,
            recipe.ingredients,
            recipe.mealType,
            recipe.description,
            recipe.directions
        ];

        try {
            await pool.query(query, values);
            console.log(`Inserted recipe: ${recipe.title}`);
        } catch (insertErr) {
            console.error('Error inserting recipe:', insertErr);
        }
    }

    // Close the database connection
    await pool.end();
});
