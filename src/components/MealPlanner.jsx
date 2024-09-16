import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import RecipeModal from './RecipeModal'; // Import the RecipeModal component

const MealPlanner = ({ favorites, onDelete }) => { // Accept favorites and onDelete as props
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe
    const [activeTab, setActiveTab] = useState('breakfast'); // State for the active tab
    const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal open status
    const dropdownRef = useRef(null); // Add a ref for the dropdown

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setSelectedRecipe(null); // Close the modal
        setIsModalOpen(false); // Close the modal
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (dropdownRef.current) {
            dropdownRef.current.removeAttribute('open');
        }
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
            <h2 className="text-2xl font-bold mb-4">Favorites</h2>
            <details ref={dropdownRef} className="dropdown dropdown-right mb-4">
                <summary className="btn m-1">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </summary>
                <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => handleTabChange('breakfast')}>Breakfast</a></li>
                    <li><a onClick={() => handleTabChange('lunch')}>Lunch</a></li>
                    <li><a onClick={() => handleTabChange('dinner')}>Dinner</a></li>
                </ul>
            </details>

            <div className='favorites-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {groupedFavorites[activeTab] && groupedFavorites[activeTab].length > 0 ? (
                    groupedFavorites[activeTab].map((recipe) => (
                        <div key={`${recipe.id}-${recipe.mealType}`} className="card card-compact bg-base-100 shadow-xl">
                            <figure>
                                <img src={recipe.image || "https://via.placeholder.com/400x200?text=No+Image"} alt={recipe.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{recipe.title}</h2>
                                <p>Ready in {recipe.ready_in_minutes} minutes</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => handleRecipeClick(recipe)}>Show Instructions</button>
                                    <button className="btn btn-error" onClick={() => onDelete(recipe.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No favorite recipes for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} yet.</p> // Message when there are no favorites
                )}
            </div>

            {/* Modal for displaying recipe details */}
            {selectedRecipe && (
                <RecipeModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    recipe={selectedRecipe}
                    onSave={() => {}} // We don't need to save here, so pass an empty function
                    showSaveButton={false} // Add this line
                />
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
        image: PropTypes.string,
    })).isRequired, // Validate favorites as a required array of recipe objects
    onDelete: PropTypes.func.isRequired, // Add PropType for onDelete function
};

export default MealPlanner;
