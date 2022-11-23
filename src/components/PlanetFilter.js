import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function PlanetFilter() {
  const { functions } = useContext(StarWarsContext);
  const { setInputValue } = functions;

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ ({ target }) => setInputValue(target.value) }
    />
  );
}

export default PlanetFilter;
