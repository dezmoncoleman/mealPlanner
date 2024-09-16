import React, { useState, useEffect } from 'react';
import HeroSearch from './components/HeroSearch';
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
        <div className="min-h-screen bg-base-200">
            <HeroSearch onSave={handleSaveRecipe} favorites={favorites} />
            <div className="container mx-auto px-4 py-8">
                <MealPlanner favorites={favorites} onDelete={handleDeleteRecipe} />
            </div>
        </div>
    );
};

export default App;
