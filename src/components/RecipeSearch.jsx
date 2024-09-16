import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from './RecipeModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
            const response = await fetch(`${API_URL}/recipes/meal-type/${type}`);
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
    const handleSave = () => {
        if (selectedRecipe) {
            const isAlreadyFavorite = favorites.some(fav => fav.id === selectedRecipe.id);
            if (isAlreadyFavorite) {
                setMessage("Recipe is already in favorites"); // Set the message
                return; // Do not save if already in favorites
            }

            // Include mealType when saving the recipe
            onSave({ ...selectedRecipe, mealType }); // Call the onSave function passed from App
            closeModal(); // Close the modal after saving
            setMealType(''); // Reset meal type selection
            setRecipes([]); // Clear the recipes list
        }
    };

    // Close the recipe list
    const closeRecipeList = () => {
        setRecipes([]); // Clear the recipes list
        setMealType(''); // Reset meal type selection
    };

    return (
        <div className="text-neutral-content">
            <details ref={dropdownRef} className="dropdown mb-4">
                <summary className="btn btn-primary m-1">
                    {mealType || 'Select Meal Type'}
                </summary>
                <ul className="dropdown-content menu bg-base-100 text-base-content rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => handleMealTypeChange('breakfast')}>Breakfast</a></li>
                    <li><a onClick={() => handleMealTypeChange('lunch')}>Lunch</a></li>
                    <li><a onClick={() => handleMealTypeChange('dinner')}>Dinner</a></li>
                </ul>
            </details>

            {loading && <p>Loading...</p>}
            {message && <p className="error-message text-error">{message}</p>} {/* Display the message */}

            <div className='recipe-results grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-item bg-base-100 text-base-content p-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow' onClick={() => handleRecipeClick(recipe)}>
                        <h3 className="font-bold text-lg">{recipe.title}</h3>
                        <p className="text-sm">Ready in {recipe.ready_in_minutes} minutes</p>
                    </div>
                ))}
            </div>

            {/* Modal for displaying recipe details */}
            {selectedRecipe && (
                <RecipeModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    recipe={selectedRecipe}
                    onSave={handleSave}
                    showSaveButton={true}
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
