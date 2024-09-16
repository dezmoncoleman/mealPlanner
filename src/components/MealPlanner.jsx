import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const MealPlanner = ({ favorites, onDelete }) => { // Accept favorites and onDelete as props
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe
    const [activeTab, setActiveTab] = useState('breakfast'); // State for the active tab

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe
    };

    const closeModal = () => {
        setSelectedRecipe(null); // Close the modal
    };
    // Group favorites by meal type
    const groupedFavorites = favorites.reduce((acc, recipe) => {
        const mealType = recipe.mealType; // Assuming each recipe has a mealType property
        if (!acc[mealType]) {
            acc[mealType] = [];
        }
        acc[mealType].push(recipe);
        return acc;
    }, {});

    return (
        <div>
            <h2>Favorites</h2>
            <div className="tabs">
                <button onClick={() => setActiveTab('breakfast')} className={activeTab === 'breakfast' ? 'active' : ''}>
                    Breakfast
                </button>
                <button onClick={() => setActiveTab('lunch')} className={activeTab === 'lunch' ? 'active' : ''}>
                    Lunch
                </button>
                <button onClick={() => setActiveTab('dinner')} className={activeTab === 'dinner' ? 'active' : ''}>
                    Dinner
                </button>
            </div>

            <div className='favorites-list'>
                {groupedFavorites[activeTab] && groupedFavorites[activeTab].length > 0 ? (
                    groupedFavorites[activeTab].map((recipe) => (
                        <div key={`${recipe.id}-${recipe.mealType}`} className='favorite-item'>
                            <div onClick={() => handleRecipeClick(recipe)}>
                                <h4>{recipe.title}</h4>
                                <p>Ready in {recipe.ready_in_minutes} minutes</p>
                            </div>
                            <button onClick={() => onDelete(recipe.id)} className="delete-btn">Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No favorite recipes for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} yet.</p> // Message when there are no favorites
                )}
            </div>

            {/* Modal for displaying recipe details */}
            {selectedRecipe && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <h2>{selectedRecipe.title}</h2>
                        <p><strong>Ready in:</strong> {selectedRecipe.ready_in_minutes} minutes</p>
                        <p><strong>Description:</strong> {selectedRecipe.description}</p>
                        <p><strong>Ingredients:</strong> {selectedRecipe.ingredients.join(', ')}</p>
                        <p><strong>Directions:</strong> {selectedRecipe.directions}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Define prop types
MealPlanner.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        ready_in_minutes: PropTypes.number.isRequired,
        mealType: PropTypes.string.isRequired, // Ensure mealType is required
        description: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        direction: PropTypes.string,
    })).isRequired, // Validate favorites as a required array of recipe objects
    onDelete: PropTypes.func.isRequired, // Add PropType for onDelete function
};

export default MealPlanner;
