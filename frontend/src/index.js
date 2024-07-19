import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import SignIn from './signin';
import Home from './home';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>

 
 <Routes>
  <Route path="/" element={<SignIn />} />
  <Route path="/home" element={<Home />} />
 </Routes>
    </BrowserRouter>
  </React.StrictMode>
);