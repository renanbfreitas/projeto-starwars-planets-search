import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [columnValue, setColumnValue] = useState('population');
  const [operatorValue, setOperatorValue] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        setData(results);
        setDataFilter(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const filtered = data.filter((planet) => (
      planet.name.includes(inputValue)
    ));
    setDataFilter(filtered);
  }, [inputValue, data]);

  const handleChangesNumeric = () => {
    if (operatorValue === 'maior que') {
      const filterBiggerThen = dataFilter.filter((planet) => (
        Number(planet[columnValue]) > Number(numberValue)
      ));
      setDataFilter(filterBiggerThen);
    } else if (operatorValue === 'menor que') {
      const filterLessThen = dataFilter.filter((planet) => (
        Number(planet[columnValue]) < Number(numberValue)
      ));
      setDataFilter(filterLessThen);
    } else {
      const filterByEqual = dataFilter.filter((planet) => (
        Number(planet[columnValue]) === Number(numberValue)
      ));
      setDataFilter(filterByEqual);
    }

    setFilterByNumericValues(filterByNumericValues.concat({
      column: columnValue,
      comparison: operatorValue,
      value: numberValue,
    }));
  };

  const contextValue = {
    data,
    dataFilter,
    filterByName: {
      name: inputValue,
    },
    numberValue,
    filterByNumericValues,
    functions: {
      setInputValue,
      setColumnValue,
      setOperatorValue,
      setNumberValue,
      handleChangesNumeric,
    },
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
