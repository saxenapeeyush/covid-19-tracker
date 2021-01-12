import React from 'react';
import  { Link } from 'react-router-dom';

import { ICONS } from '../../utils/configs/icons';

import './box.css';

const Box = (props) => {

  const { data } = props;

  
  return (
    <div className = "bo385BoxContainer">
      <div className = "bo378BoxInnerContainer">
      {data.map(({name,tag},idx) => {

         return <div className = "bo385BoxContent" key = {idx}><Link to = {`/state/${tag}`}>{name} <span className = "bo385BoxTag">{tag} <i className = {ICONS['arrow-circle-right']}></i></span></Link></div>

       })}
       </div>

    </div>
  );

}

export default Box;
