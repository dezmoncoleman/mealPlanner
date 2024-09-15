import React, { useState, useEffect } from 'react';
import RecipeSearch from './components/RecipeSearch';
import MealPlanner from './components/MealPlanner';

const App = () => {
    const [favorites, setFavorites] = useState(() => {
        // Load favorites from local storage on initial render
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Save favorites to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Define the handleSaveRecipe function
    const handleSaveRecipe = (recipe) => {
        setFavorites((prevFavorites) => [...prevFavorites, recipe]); // Add the recipe to favorites
    };

    return (
        <div>
            <h1>30 Minutes or Less1</h1>
            <RecipeSearch onSave={handleSaveRecipe} /> {/* Pass the save function as a prop */}
            <MealPlanner favorites={favorites} /> {/* Pass favorites to MealPlanner */}
        </div>
    );
};

export default App;
