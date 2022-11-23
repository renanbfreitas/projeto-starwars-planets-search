import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function NumericFilter() {
  const { functions, numberValue } = useContext(StarWarsContext);
  const {
    setColumnValue,
    setOperatorValue,
    setNumberValue,
    handleChangesNumeric,
  } = functions;

  const columnFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const operatorFilter = ['maior que', 'menor que', 'igual a'];

  return (
    <>
      <label htmlFor="column">
        Coluna:
        <select
          id="column"
          data-testid="column-filter"
          onChange={ ({ target }) => setColumnValue(target.value) }
        >
          {columnFilter.map((item) => (
            <option value={ item } key={ item }>{item}</option>
          ))}
        </select>
      </label>

      <label htmlFor="operator">
        Operador:
        <select
          id="operator"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setOperatorValue(target.value) }
        >
          {operatorFilter.map((item) => (
            <option value={ item } key={ item }>{item}</option>
          ))}
        </select>
      </label>

      <label htmlFor="number">
        Valor:
        <input
          type="number"
          id="number"
          data-testid="value-filter"
          value={ numberValue }
          onChange={ ({ target }) => setNumberValue(target.value) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleChangesNumeric }
      >
        Filtrar
      </button>
    </>
  );
}

export default NumericFilter;
