import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function PlanetFilter() {
  const { functions } = useContext(StarWarsContext);
  const { setInputValue } = functions;

  return (
    <div className="planetFilter">
      <input
        type="text"
        data-testid="name-filter"
        className="filter"
        onChange={ ({ target }) => setInputValue(target.value) }
      />
    </div>
  );
}

export default PlanetFilter;
