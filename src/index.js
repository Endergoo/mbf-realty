import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './Layout';
import Listings from './pages/Listings';
import About from './pages/About';
import Agents from './pages/Agents';
import Contact from './pages/Contact';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

export default function App() 
{
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="listings" element={<Listings />}/>
        <Route path="agents" element={<Agents />}/>
        <Route path="about" element={<About />}/>
        <Route path="contact" element={<Contact />}/>
        <Route path="signin" element={<SignIn />}/>

        </Route>
      </Routes>a
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);