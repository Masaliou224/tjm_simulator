import React from "react";
import logo from '../assets/images/nawaariLogo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="Nawaari Logo" className="logo" />
      <p><a href="#">Copyright © 2020 Nawaari, Tous Droits Réservés.</a></p>
    </footer>
  );
};

export default Footer;