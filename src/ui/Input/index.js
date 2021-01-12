import React from 'react';

import './input.css';

const Input = (props) => {

  const { type , placeholder , onChange , value , label } = props;
  
  return (
    <div>

    <div className = "in871InputBoxContainer">


    <label className = "in871InputBoxLabel">{label}</label>

      <div className = "in871InputLine"></div>
      
      <input value = {value} onChange = {onChange} type = {type} placeholder = {placeholder}/>
   
    </div>
    </div>
  );

}

export default Input;
