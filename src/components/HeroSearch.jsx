import React from 'react';
import RecipeSearch from './RecipeSearch';

const HeroSearch = ({ onSave, favorites }) => {
  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)"}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="mb-5 text-4xl md:text-5xl font-bold">Recipe Search</h1>
          <p className="mb-5 text-sm md:text-base">
            Discover delicious recipes for your next meal. Search by meal type and find the perfect dish to satisfy your cravings. Save to your favorites and view below.
          </p>
          <RecipeSearch onSave={onSave} favorites={favorites} />
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
