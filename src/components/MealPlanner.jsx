import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import RecipeModal from './RecipeModal'; // Import the RecipeModal component

const MealPlanner = ({ favorites, onDelete }) => { // Accept favorites and onDelete as props
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe
    const [activeTab, setActiveTab] = useState(''); // State for the active tab
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
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Favorites</h2>
            <details ref={dropdownRef} className="dropdown dropdown-right mb-6">
                <summary className="btn btn-primary m-1">
                    {activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Select Meal Type'}
                </summary>
                <ul className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => handleTabChange('breakfast')}>Breakfast</a></li>
                    <li><a onClick={() => handleTabChange('lunch')}>Lunch</a></li>
                    <li><a onClick={() => handleTabChange('dinner')}>Dinner</a></li>
                </ul>
            </details>

            <div className='favorites-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {activeTab && groupedFavorites[activeTab] && groupedFavorites[activeTab].length > 0 ? (
                    groupedFavorites[activeTab].map((recipe) => (
                        <div key={`${recipe.id}-${recipe.mealType}`} className="card card-compact bg-base-200 shadow-xl">
                            <figure>
                                <img src={recipe.image || "https://via.placeholder.com/400x200?text=No+Image"} alt={recipe.title} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-lg">{recipe.title}</h2>
                                <p className="text-sm">Ready in {recipe.ready_in_minutes} minutes</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleRecipeClick(recipe)}>Show Instructions</button>
                                    <button className="btn btn-error btn-sm" onClick={() => onDelete(recipe.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-lg">{activeTab ? `No favorite recipes for ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} yet.` : 'Please select a meal type to view favorites.'}</p> // Message when there are no favorites
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
