import React from 'react';
import logo from '../logo.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Header.css';

function Header() {
  return (
    <header className="App-header">
      <div className="header-center">
        {/* Logo flotante */}
        <motion.img 
          src={logo} 
          alt="Logo" 
          className="header-logo"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="header-title-wrapper">
          <h1 className="header-title">Diego Da Rocha</h1>
          <p className="header-role">App Developer • React • Fullstack</p>

          {/* 🔽 Botones de descarga debajo del rol */}
          <div className="resume-buttons">
            <a href="/ddr/Diego_Da_Rocha_Resume-ENG.pdf" download className="resume-btn">
              <FaFilePdf /> English Resume
            </a>
            <a href="/ddr/Diego_Da_Rocha_CV-ESP.pdf" download className="resume-btn">
              <FaFilePdf /> CV en Español
            </a>
          </div>
        </div>

        <div className="header-links">
          <a href="https://github.com/DDAROCHA" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/diego-da-rocha" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:ddarocha@jdnservice.com">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
