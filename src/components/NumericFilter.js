import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function NumericFilter() {
  const { functions, numberValue, columnNewFilter } = useContext(StarWarsContext);
  const {
    setColumnValue,
    setOperatorValue,
    setNumberValue,
    handleChangesNumeric,
    clearAllFilters,
  } = functions;

  const operatorFilter = ['maior que', 'menor que', 'igual a'];

  return (
    <div className="numericFilter">
      <label htmlFor="column">
        Coluna:
        <select
          id="column"
          data-testid="column-filter"
          className="coluna"
          onChange={ ({ target }) => setColumnValue(target.value) }
        >
          {columnNewFilter.map((item) => (
            <option value={ item } key={ item }>{item}</option>
          ))}
        </select>
      </label>

      <label htmlFor="operator">
        Operador:
        <select
          id="operator"
          data-testid="comparison-filter"
          className="operador"
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
          className="valor"
          value={ numberValue }
          onChange={ ({ target }) => setNumberValue(target.value) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        className="filtrar"
        onClick={ handleChangesNumeric }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        className="remover-filtro"
        onClick={ clearAllFilters }
      >
        Remover Filtros
      </button>
    </div>
  );
}

export default NumericFilter;
