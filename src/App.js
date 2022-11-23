import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import PlanetFilter from './components/PlanetFilter';
import NumericFilter from './components/NumericFilter';
import './App.css';

function App() {
  return (
    <Provider>
      <Table />
      <PlanetFilter />
      <NumericFilter />
    </Provider>
  );
}

export default App;
