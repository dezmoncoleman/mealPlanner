import React, { useState } from 'react';
import RecipeSearch from './components/RecipeSearch';
import MealPlanner from './components/MealPlanner';

const App = () => {
    const [favorites, setFavorites] = useState([]); // State to hold favorite recipes

    // Define the handleSaveRecipe function
    const handleSaveRecipe = (recipe) => {
        setFavorites((prevFavorites) => [...prevFavorites, recipe]); // Add the recipe to favorites
    };

    return (
        <div>
            <h1>30 Minutes or Less</h1>
            <RecipeSearch onSave={handleSaveRecipe} /> {/* Pass the save function as a prop */}
            <MealPlanner favorites={favorites} /> {/* Pass favorites to MealPlanner */}
        </div>
    );
};

export default App;
