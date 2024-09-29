import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

const MainMenu = () => {
const [activeMenu, setActiveMenu] = useState("Customers");


    return (
        <div>
            <Menu secondary>
                <Menu.Item 
                    onClick={() => setActiveMenu('Customers')}
                    active={activeMenu === 'Customers'}>
                    Customers
                </Menu.Item>
                <Menu.Item 
                    onClick={() => setActiveMenu('Products')}
                    active={activeMenu === 'Products'}>
                    Products
                </Menu.Item>
                <Menu.Item 
                    onClick={() => setActiveMenu('Stores')}
                    active={activeMenu === 'Stores'}>
                    Stores
                </Menu.Item>
                <Menu.Item 
                    onClick={() => setActiveMenu('Sales')}
                    active={activeMenu === 'Sales'}>
                    Sales
                </Menu.Item>
            </Menu>

        </div>
    );
};

export default MainMenu;