import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const RecipeModal = ({ isOpen, onClose, recipe, onSave, showSaveButton = true }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [isOpen]);

    const handleCloseClick = (e) => {
        e.preventDefault(); // Prevent form submission
        onClose();
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <form method="dialog" onSubmit={(e) => e.preventDefault()}>
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                        onClick={handleCloseClick}
                    >
                        ✕
                    </button>
                </form>
                <h3 className="text-lg font-bold text-black">{recipe.title}</h3>
                <p className='text-black'><strong>Ready in:</strong> {recipe.ready_in_minutes} minutes</p>
                <p className='text-black'><strong>Description:</strong> {recipe.description || 'No description available.'}</p>
                <p className='text-black'><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                <p className='text-black'><strong>Directions:</strong> {recipe.directions || 'No directions available.'}</p>
                {showSaveButton && (
                    <button className="btn btn-primary mt-4" onClick={() => onSave(recipe)}>Save to Favorites</button>
                )}
            </div>
        </dialog>
    );
};

RecipeModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    recipe: PropTypes.shape({
        title: PropTypes.string.isRequired,
        ready_in_minutes: PropTypes.number.isRequired,
        description: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        directions: PropTypes.string,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    showSaveButton: PropTypes.bool
};

export default RecipeModal;
