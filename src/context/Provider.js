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
  const [orderColumn, setOrderColumn] = useState('population');
  const [ordenation, setOrdenation] = useState('ASC');
  const [order, setOrder] = useState({
    column: orderColumn,
    sort: ordenation,
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        const sortData = results.sort((a, b) => a.name.localeCompare(b.name));
        setData(sortData);
        setDataFilter(sortData);
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

  const changeDataOrder = () => {
    if (order.sort === 'ASC') {
      const ascOrder = dataFilter.sort((a, b) => (
        b[order.column] - a[order.column]
      ));
      const AscOrder = ascOrder.sort((a, b) => (
        a[order.column] - b[order.column]
      ));
      setDataFilter(AscOrder);
    }

    if (order.sort === 'DESC') {
      const descOrder = dataFilter.sort((a, b) => (
        b[order.column] - a[order.column]
      ));
      const DescOrder = descOrder.sort((a, b) => (
        a[order.column] - b[order.column]
      ));
      const fullyCorrectOrder = DescOrder.sort((a, b) => (
        b[order.column] - a[order.column]
      ));
      setDataFilter(fullyCorrectOrder);
    }

    setOrder({
      column: orderColumn,
      sort: ordenation,
    });
  };

  useEffect(() => {
    setOrder({
      column: orderColumn,
      sort: ordenation,
    });
  }, [orderColumn, ordenation]);

  const contextValue = {
    data,
    dataFilter,
    filterByName: {
      name: inputValue,
    },
    order,
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
      setOrderColumn,
      setOrdenation,
      changeDataOrder,
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
