import React from 'react';
import s from './Header.module.css';

function Header() {
  return (
    <div className={s.header}>
      <h1 className={s.name}>Currency Converter</h1>
    </div>
  );
}

export default Header;
