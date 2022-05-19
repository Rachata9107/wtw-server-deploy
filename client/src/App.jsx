import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navtab from './components/Navtab';
import Contents from './components/Contents';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      <Navtab />
      <Contents />
      <Footer />
    </div>
  )
}

export default App
