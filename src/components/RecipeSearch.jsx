import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RecipeSearch = ({ onSave }) => {
    const [mealType, setMealType] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const fetchRecipes = async (type) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/recipes/meal-type/${type}`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMealTypeChange = (e) => {
        const selectedType = e.target.value;
        setMealType(selectedType);
        if (selectedType) {
            fetchRecipes(selectedType);
        } else {
            setRecipes([]);
        }
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    const handleSave = () => {
        if (selectedRecipe) {
            onSave(selectedRecipe); // Call the onSave function passed from App
            closeModal(); // Close the modal after saving
        }
    };

    return (
        <div>
            <h2>Search for Recipes</h2>
            <label htmlFor="mealType">Select Meal Type:</label>
            <select id="mealType" value={mealType} onChange={handleMealTypeChange}>
                <option value="">--Select Meal Type--</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>

            {loading && <p>Loading...</p>}

            <div className='recipe-results'>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-item' onClick={() => handleRecipeClick(recipe)}>
                        <h3>{recipe.title}</h3>
                        <p>Ready in {recipe.ready_in_minutes} minutes</p>
                    </div>
                ))}
            </div>

            {selectedRecipe && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <h2>{selectedRecipe.title}</h2>
                        <p><strong>Ready in:</strong> {selectedRecipe.ready_in_minutes} minutes</p>
                        <p><strong>Description:</strong> {selectedRecipe.description}</p>
                        <p><strong>Ingredients:</strong> {selectedRecipe.ingredients.join(', ')}</p>
                        <p><strong>Directions:</strong> {selectedRecipe.direction}</p>
                        <button onClick={handleSave}>Save to Favorites</button>
                    </div>
                </div>
            )}
        </div>
    );
};

RecipeSearch.propTypes = {
    onSave: PropTypes.func.isRequired,
};

export default RecipeSearch;
