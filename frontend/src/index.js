import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUp from './signup';
import Home from './home';
import Dash from './dash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>      

      <Dash/>
      <Routes>
        <Route exact path='/home' Component={()=><Home/>}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

