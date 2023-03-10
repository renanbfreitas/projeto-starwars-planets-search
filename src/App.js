import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import PlanetFilter from './components/PlanetFilter';
import NumericFilter from './components/NumericFilter';
import MultipleFilter from './components/MultipleFilter';
import PlanetOrder from './components/PlanetOrder';
import './App.css';

function App() {
  return (
    <Provider>
      <Table />
      <PlanetFilter />
      <NumericFilter />
      <MultipleFilter />
      <PlanetOrder />
    </Provider>
  );
}

export default App;
