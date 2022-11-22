import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import PlanetFilter from './components/PlanetFilter';
import './App.css';

function App() {
  return (
    <Provider>
      <Table />
      <PlanetFilter />
    </Provider>
  );
}

export default App;
