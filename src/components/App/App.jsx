import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AllItems from '../../pages/AllItems/AllItems';
import Error from '../../pages/Error/Error';
import Cart from '../../pages/Cart/Cart';
import Contacts from '../../pages/Contacts/Contacts';
import Favorites from '../../pages/Favorites/Favorites';
import Product from '../../pages/Product/Product';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AllItems />}></Route>
          <Route path="/product/*" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
