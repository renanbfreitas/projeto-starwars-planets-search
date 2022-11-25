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
  const [columnNewFilter, setColumnNewFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [enableRemoveFilter, setEnableRemoveFilter] = useState(false);

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
    setFilterByNumericValues(filterByNumericValues.concat({
      column: columnValue,
      comparison: operatorValue,
      value: numberValue,
    }));
    setEnableRemoveFilter(false);
    setColumnNewFilter(columnNewFilter.filter((item) => item !== columnValue));
  };

  const clearAllFilters = () => {
    setDataFilter(data);
    setFilterByNumericValues([]);
  };

  const removeFilter = (value) => {
    setColumnNewFilter(columnNewFilter.concat(value));
    setFilterByNumericValues(filterByNumericValues.filter((i) => i.column !== value));
    setEnableRemoveFilter(true);
  };

  const setBaseArray = (baseArray) => {
    filterByNumericValues.forEach((item) => {
      if (item.comparison === 'maior que') {
        const filterBiggerThen = baseArray.filter((planet) => (
          Number(planet[item.column]) > Number(item.value)
        ));
        setDataFilter(filterBiggerThen);
      } else if (item.comparison === 'menor que') {
        const filterLessThen = baseArray.filter((planet) => (
          Number(planet[item.column]) < Number(item.value)
        ));
        setDataFilter(filterLessThen);
      } else {
        const filterByEqual = baseArray.filter((planet) => (
          Number(planet[item.column]) === Number(item.value)
        ));
        setDataFilter(filterByEqual);
      }
    });
  };

  const setFilterByCondition = () => {
    if (enableRemoveFilter) {
      setBaseArray(data);
    } else {
      setBaseArray(dataFilter);
    }
  };

  useEffect(() => {
    setColumnValue(columnNewFilter[0]);
    setNumberValue(0);
    if (filterByNumericValues.length < 1) {
      setDataFilter(data);
    } else {
      setFilterByCondition();
    }
  }, [filterByNumericValues]);

  const contextValue = {
    data,
    dataFilter,
    filterByName: {
      name: inputValue,
    },
    columnNewFilter,
    numberValue,
    filterByNumericValues,
    functions: {
      setInputValue,
      setColumnValue,
      setOperatorValue,
      setNumberValue,
      handleChangesNumeric,
      clearAllFilters,
      removeFilter,
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
