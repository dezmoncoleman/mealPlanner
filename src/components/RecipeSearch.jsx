import React from 'react';

function RecipeSearch() {
    const [query, setQuery] = useState('');
    const [resipes, setRecipes]= useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/recipes?query=${query}`);
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
    }
    return (
        <div>
            <h2>Search for Recipes</h2>
            <form onSubmit={handleSearch}>
                <input 
                type="text"
                placeholder='Enter recipe name...'
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
                />
                <button type='submit'>Search</button>
            </form>
            {loading && <p>Loading...</p>}
            <div className='recipe-results'>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-item'>
                        <img src="{recipe.id}" className='recipe-item' />
                        <h3>{recipe.title}</h3>
                        <p>Ready in {recipe.readyInMinutes} minutes</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeSearch;
