import React from "react"
import logo from '../assets/images/nawaariLogo.png';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Nawaari Logo" className="logo" />
      <h1 className="title">Calcul tjm freelance simulateur</h1>
    </header>
  );
};

export default Header;