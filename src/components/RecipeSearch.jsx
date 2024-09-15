import React, { useState, useEffect } from 'react';

const RecipeSearch = () => {
    const [mealType, setMealType] = useState(''); // State for selected meal type
    const [recipes, setRecipes] = useState([]); // State for recipes
    const [loading, setLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe

    // Function to fetch recipes based on selected meal type
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

    // Handle meal type change
    const handleMealTypeChange = (e) => {
        const selectedType = e.target.value;
        setMealType(selectedType);
        if (selectedType) {
            fetchRecipes(selectedType); // Fetch recipes when a meal type is selected
        } else {
            setRecipes([]); // Clear recipes if no meal type is selected
        }
    };

    // Handle recipe click to show details
    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    // Close the modal
    const closeModal = () => {
        setSelectedRecipe(null);
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

            {/* Modal for displaying recipe details */}
            {selectedRecipe && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <h2>{selectedRecipe.title}</h2>
                        <p> {selectedRecipe.description}</p>
                        <p><strong>Ready in:</strong> {selectedRecipe.ready_in_minutes} minutes</p>
                        <p><strong>Ingredients:</strong> {selectedRecipe.ingredients.join(', ')}</p> {/* Join ingredients with a comma */}
                        <p><strong>Directions:</strong> {selectedRecipe.directions}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeSearch;
