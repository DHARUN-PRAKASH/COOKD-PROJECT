import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './home';
import Wishlist from './wishlist';
import { SignIn } from './signin';
import SignUp from './signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (sessionStorage.getItem('logged'))
    ? (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/wishlist' element={<Wishlist />} />
          <Route exact path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    )
    : (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    )
);
