'use client';

import { useSavedCocktails } from '../../hooks/useSavedCocktails';

export default function SavedPage() {
  const { savedCocktails, removeFromSavedCocktails } = useSavedCocktails();

  return (
    <div className="flex-center">
      <h1 className='text-2xl font-bold mb-5'>Saved Cocktails</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
        {savedCocktails.length > 0 ? (
          savedCocktails.map((cocktail) => (
            <div className='flex flex-col' key={cocktail.idDrink}>
              <img className='w-[200px]' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p className='text-sm italic font-extralight py-2'>{cocktail.strDrink}</p>
              <button className='btn-primary relative' onClick={() => removeFromSavedCocktails(cocktail.idDrink)}>Remove
              
              {cocktail.count > 0 && (
                <p className='count-info right-[-10px]'>
                  {cocktail.count}
                </p>
              )}
              </button>
              
            </div>
          ))
        ) : (
          <p className='text-sm font-light italic mb-5'>No saved cocktails</p>
        )}
      </div>
    </div>
  );
}
