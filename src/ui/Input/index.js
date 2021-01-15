import React from 'react';
import { ICONS } from '../../utils/configs/icons';

import './input.css';

const Input = (props) => {

  const { type , placeholder , onChange , value , label , iconName } = props;
  
  return (
    <div>

    <div className = "in871InputBoxContainer">


    <label className = "in871InputBoxLabel">{label}</label>

      <div className = "in871InputLine"></div>
      
      <div className = "in871InputBlock">
        <input value = {value} onChange = {onChange} type = {type} placeholder = {placeholder}/>
        <i className = {ICONS[iconName]}></i>
        </div>
   
    </div>
    </div>
  );

}

export default React.memo(Input);
