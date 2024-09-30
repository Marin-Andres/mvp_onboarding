import { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import CustomerTable from './components/CustomerTable';
import ProductTable from './components/ProductTable';
import StoreTable from './components/StoreTable';
import SaleTable from './components/SaleTable';

function App() {
  const [activeMenu, setActiveMenu] = useState("Customers");

  const multiTable = () => {
    switch (activeMenu) {
      case "Customers":
        return <CustomerTable />;
      case "Products":
        return <ProductTable />;
      case "Stores":
        return <StoreTable />;
      case "Sales":
        return <SaleTable />;
      default:
        return <CustomerTable />;
    }
  };
  

  return (
    <div>
      <MainMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      {multiTable()}
    </div>
  );

}

export default App;
