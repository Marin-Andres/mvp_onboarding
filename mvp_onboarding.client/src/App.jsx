import { useState } from 'react';
import './App.css';
import CustomerTable from './components/CustomerTable';
import MainMenu from './components/MainMenu';

function App() {
  const [activeMenu, setActiveMenu] = useState("Customers");


  return (
    <div>
      <MainMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      <CustomerTable />
    </div>
  );

}

export default App;
