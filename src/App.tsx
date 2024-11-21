import React from 'react';
import './App.css';
import TJMCalculator from './components/TJMCalculator';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <TJMCalculator />
      <Footer />
    </div>
  );
}

export default App;
