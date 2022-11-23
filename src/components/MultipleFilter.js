import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function MultipleFilter() {
  const { filterByNumericValues } = useContext(StarWarsContext);

  return (
    <div>
      {filterByNumericValues.length > 0 && (
        filterByNumericValues.map((item, index) => (
          <div key={ index }>
            <span>{`${item.column} ${item.comparison} ${item.value}`}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default MultipleFilter;
