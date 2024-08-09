import { useState, useEffect } from 'react';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface SavedCocktail extends Cocktail {
  count: number; 
}

export function useSavedCocktails() {
  const [savedCocktails, setSavedCocktails] = useState<SavedCocktail[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCocktails');
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved);
        if (Array.isArray(parsedSaved)) {
          setSavedCocktails(parsedSaved);
        } else {
          console.error('Saved cocktails is not an array');
          setSavedCocktails([]);
        }
      } catch (error) {
        console.error('Failed to parse saved cocktails', error);
        setSavedCocktails([]);
      }
    }
  }, []);

  const addToSavedCocktails = (cocktail: Cocktail) => {
    try {
      const existingCocktail = savedCocktails.find(c => c.idDrink === cocktail.idDrink);

      if (existingCocktail) {
        const updated = savedCocktails.map(c => 
          c.idDrink === cocktail.idDrink 
            ? { ...c, count: c.count + 1 } 
            : c
        );
        setSavedCocktails(updated);
        localStorage.setItem('savedCocktails', JSON.stringify(updated));
      } else {
        const updated = [...savedCocktails, { ...cocktail, count: 1 }];
        setSavedCocktails(updated);
        localStorage.setItem('savedCocktails', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error adding cocktail to saved list:', error);
      const updated = [...savedCocktails, { ...cocktail, count: 1 }];
      setSavedCocktails(updated);
      localStorage.setItem('savedCocktails', JSON.stringify(updated));
    }
  };

  const removeFromSavedCocktails = (idDrink: string) => {
    const updated = savedCocktails.reduce((acc: SavedCocktail[], cocktail) => {
      if (cocktail.idDrink === idDrink) {
        if (cocktail.count > 1) {
          acc.push({ ...cocktail, count: cocktail.count - 1 });
        }
      } else {
        acc.push(cocktail);
      }
      return acc;
    }, []);
    setSavedCocktails(updated);
    localStorage.setItem('savedCocktails', JSON.stringify(updated));
  };

  return { savedCocktails, addToSavedCocktails, removeFromSavedCocktails };
}
