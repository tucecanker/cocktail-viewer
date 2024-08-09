'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBasket } from '../../hooks/useBasket';
import { useSavedCocktails } from '../../hooks/useSavedCocktails';
import { useHandleKeyDown } from '../../hooks/useHandleKeyDown';


const API_URL = `https://www.thecocktaildb.com/api/json/v1/${process.env.NEXT_PUBLIC_COCKTAIL_API_KEY}/search.php`;

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const { basket, addToBasket, removeFromBasket } = useBasket();
  const { addToSavedCocktails } = useSavedCocktails();

  const handleSearch = async () => {
    const res = await fetch(`${API_URL}?s=${query}`);
    const data = await res.json();
    setCocktails(data.drinks || []);
  };

  const handleKeyDown = useHandleKeyDown(handleSearch);

  return (
    <div className="flex-center">
      <h1 className='text-2xl font-bold mb-5'>Search Cocktails</h1>
      <input
        className="mb-2 px-4 py-2 border rounded-md w-[300px]"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className='btn-primary w-[300px] my-5' onClick={handleSearch}>Search</button>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
        {cocktails.map((cocktail) => (
          <div className='flex flex-col' key={cocktail.idDrink}>
            <img className='w-[200px]' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p className='text-sm italic font-extralight py-2'>{cocktail.strDrink}</p>
            <div className='flex items-center gap-2 relative'>
              <button className='btn-secondary w-full' onClick={() => { addToBasket(cocktail); addToSavedCocktails(cocktail); }}>Add</button>
              {basket[cocktail.idDrink] > 0 && (
                <>
                  <p className='count-info left-[125px]'>
                    {basket[cocktail.idDrink]}
                  </p>
                  <button className='btn-primary w-[50px]' onClick={() => removeFromBasket(cocktail)}> - </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link href="/saved">
          <button className='btn-secondary w-[300px] mt-3'>Go to Saved</button>
        </Link>
      </div>
    </div>
  );
}
