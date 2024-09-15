import React, { useState } from 'react';

const MealPlanner = ({ favorites }) => { // Accept favorites as a prop
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe
    };

    const closeModal = () => {
        setSelectedRecipe(null); // Close the modal
    };

    return (
        <div>
            <h2>Favorites</h2>
            <div className='favorites-list'>
                {favorites.length > 0 ? (
                    favorites.map((recipe) => (
                        <div key={recipe.id} className='favorite-item' onClick={() => handleRecipeClick(recipe)}>
                            <h3>{recipe.title}</h3>
                            <p>Ready in {recipe.ready_in_minutes} minutes</p>
                        </div>
                    ))
                ) : (
                    <p>No favorite recipes yet.</p> // Message when there are no favorites
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

export default MealPlanner;
