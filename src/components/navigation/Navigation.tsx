import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Navigation.module.css';
import { ButtonPropsType } from '../types/types';

function Navigation(props: ButtonPropsType) {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (props.text === 'History') {
      navigate('/history');
    } else if (props.text === 'Converter') {
      navigate('/converter');
    }
  };

  return (
    <div className={s.nav}>
      <button type="button" className={s.navButton} onClick={clickHandler}>
        {props.text}
      </button>
    </div>
  );
}

export default Navigation;
