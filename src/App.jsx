import React from 'react';
import Navigation from './components/Navigation';
import RecipeSearch from './components/RecipeSearch';
import MealPlanner from './components/MealPlanner';

function App() {
    return (
        <div className="container">
            <Navigation />
            <RecipeSearch />
            <MealPlanner />
        </div>
    );
}

export default App;
