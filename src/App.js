import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Navbar from './components/Navbar';
import LoginPanel from './components/LoginPanel';
import Display from './components/Display';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
      <div>
          <CookiesProvider>
              <Navbar/>
          </CookiesProvider>
              <LoginPanel/>
          <div>
              <Display/>
          </div>
      </div>
  );
}

export default App;
