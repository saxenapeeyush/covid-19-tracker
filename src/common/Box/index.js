import React from 'react';
import  { Link } from 'react-router-dom';

import { ICONS } from '../../utils/configs/icons';

import './box.css';

const Box = (props) => {

  const { data , value } = props;

  
  return (
    <div className = "bo385BoxContainer">
      <div className = "bo378BoxInnerContainer">
      {data.map(({name,tag},idx) => {

        if(idx > 4) return null;

        const firstIndex = name.indexOf(value);

        const first = name.substring(0,firstIndex);

        const second = name.substr(firstIndex,value.length);

        const third = name.substring(first.length + value.length);

         return <div className = "bo385BoxContent" key = {idx}><Link to = {`/state/${tag}`}><span>{first}<span className="bo378BoxInnerStrong">{second}</span>{third}</span> <span className = "bo385BoxTag">{tag} <i className = {ICONS['arrow-circle-right']}></i></span></Link></div>

       })}
       </div>

    </div>
  );

}

export default Box;
