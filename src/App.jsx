import React, { useState, useEffect } from 'react';
import RecipeSearch from './components/RecipeSearch';
import MealPlanner from './components/MealPlanner';

const App = () => {
    const [favorites, setFavorites] = useState(() => {
        // Load favorites from localStorage on initial render
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        // Save favorites to localStorage whenever it changes
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleSaveRecipe = (recipe) => {
        setFavorites((prevFavorites) => [...prevFavorites, recipe]);
    };

    const handleDeleteRecipe = (id) => {
        setFavorites((prevFavorites) => prevFavorites.filter(recipe => recipe.id !== id));
    };

    return (
        <div>
            <h1>Meal Planner App</h1>
            <RecipeSearch onSave={handleSaveRecipe} favorites={favorites} /> {/* Pass favorites as a prop */}
            <MealPlanner favorites={favorites} onDelete={handleDeleteRecipe} /> {/* Pass favorites to MealPlanner and handle delete */}
        </div>
    );
};

export default App;
