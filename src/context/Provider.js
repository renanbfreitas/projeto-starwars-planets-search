import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results);
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
