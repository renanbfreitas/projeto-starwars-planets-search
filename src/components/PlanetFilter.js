import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function PlanetFilter() {
  const { handleChange } = useContext(StarWarsContext);

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ ({ target }) => handleChange(target.value) }
    />
  );
}

export default PlanetFilter;
