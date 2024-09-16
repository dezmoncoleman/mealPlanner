import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from './RecipeModal';

const RecipeSearch = ({ onSave, favorites = [] }) => { // Default to an empty array if favorites is undefined
    const [mealType, setMealType] = useState(''); // State for selected meal type
    const [recipes, setRecipes] = useState([]); // State for recipes
    const [loading, setLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe
    const [message, setMessage] = useState(''); // State for the message
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef(null);

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
    const handleMealTypeChange = (selectedType) => {
        setMealType(selectedType);
        if (selectedType) {
            fetchRecipes(selectedType); // Fetch recipes when a meal type is selected
        } else {
            setRecipes([]); // Clear recipes if no meal type is selected
        }
        if (dropdownRef.current) {
            dropdownRef.current.removeAttribute('open');
        }
    };

    // Handle recipe click to show details
    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setSelectedRecipe(null); // Close the modal
        setIsModalOpen(false); // Close the modal
        setMessage(''); // Clear the message
    };

    // Handle saving the recipe to favorites
    const handleSave = (recipe) => {
        const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);
        if (isAlreadyFavorite) {
            setMessage("Recipe is already in favorites"); // Set the message
            return; // Do not save if already in favorites
        }

        // Include mealType when saving the recipe
        onSave({ ...recipe, mealType }); // Call the onSave function passed from App
        closeModal(); // Close the modal after saving
        setMealType(''); // Reset meal type selection
        setRecipes([]); // Clear the recipes list
    };

    // Close the recipe list
    const closeRecipeList = () => {
        setRecipes([]); // Clear the recipes list
        setMealType(''); // Reset meal type selection
    };

    return (
        <div>
            <h2>Search for Recipes</h2>
            <details ref={dropdownRef} className="dropdown dropdown-right">
                <summary className="btn m-1">{mealType || 'Select Meal Type'}</summary>
                <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => handleMealTypeChange('breakfast')}>Breakfast</a></li>
                    <li><a onClick={() => handleMealTypeChange('lunch')}>Lunch</a></li>
                    <li><a onClick={() => handleMealTypeChange('dinner')}>Dinner</a></li>
                </ul>
            </details>

            {loading && <p>Loading...</p>}
            {message && <p className="error-message">{message}</p>} {/* Display the message */}

            {recipes.length > 0 && (
                <div className='recipe-results'>
                    <button onClick={closeRecipeList} className="close-btn">Close</button>
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className='recipe-item' onClick={() => handleRecipeClick(recipe)}>
                            <h3>{recipe.title}</h3>
                            <p>Ready in {recipe.ready_in_minutes} minutes</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for displaying recipe details */}
            {selectedRecipe && (
                <RecipeModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    recipe={selectedRecipe}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

RecipeSearch.propTypes = {
    onSave: PropTypes.func.isRequired, // Validate onSave as a required function
    favorites: PropTypes.array.isRequired, // Validate favorites as a required array
};

export default RecipeSearch;
