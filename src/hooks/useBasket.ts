import { useState, useEffect } from 'react';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export function useBasket() {
  const [basket, setBasket] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      setBasket(JSON.parse(savedBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (cocktail: Cocktail) => {
    setBasket((prevBasket) => {
      const updatedBasket = { ...prevBasket };
      updatedBasket[cocktail.idDrink] = (updatedBasket[cocktail.idDrink] || 0) + 1;
      return updatedBasket;
    });
  };

  const removeFromBasket = (cocktail: Cocktail) => {
    setBasket((prevBasket) => {
      const updatedBasket = { ...prevBasket };
      if (updatedBasket[cocktail.idDrink] > 1) {
        updatedBasket[cocktail.idDrink] -= 1;
      } else {
        delete updatedBasket[cocktail.idDrink];
      }
      return updatedBasket;
    });
  };

  return { basket, addToBasket, removeFromBasket };
}
