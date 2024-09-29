import { useEffect, useState } from 'react';
import './App.css';
import CustomerTable from './components/CustomerTable';
import MainMenu from './components/MainMenu';

function App() {

  return (
    <div>
      <MainMenu />
      <CustomerTable />
    </div>
  );

}

export default App;
