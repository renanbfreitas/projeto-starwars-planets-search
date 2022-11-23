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

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleChangesNumeric = () => {
    if (operatorValue === 'maior que') {
      const filterBiggerThen = data.filter((planet) => (
        Number(planet[columnValue]) > Number(numberValue)
      ));
      setDataFilter(filterBiggerThen);
    } else if (operatorValue === 'menor que') {
      const filterLessThan = data.filter((planet) => (
        Number(planet[columnValue]) < Number(numberValue)
      ));
      setDataFilter(filterLessThan);
    } else {
      const filterByEqual = data.filter((planet) => (
        Number(planet[columnValue]) === Number(numberValue)
      ));
      setDataFilter(filterByEqual);
    }
  };

  useEffect(() => {
    const filtered = data.filter((planet) => (
      planet.name.includes(inputValue)
    ));
    setDataFilter(filtered);
  }, [inputValue, data]);

  const contextValue = {
    data,
    dataFilter,
    handleChange,
    filterByName: {
      name: inputValue,
    },
    setColumnValue,
    setOperatorValue,
    setNumberValue,
    numberValue,
    handleChangesNumeric,
    filterByNumericValues: [
      {
        column: columnValue,
        comparison: operatorValue,
        value: numberValue,
      },
    ],
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
