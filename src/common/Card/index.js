import React from 'react';

import { ICONS } from '../../utils/configs/icons';
import { addingCommasToNumbers } from '../../utils/helpers/helper';

import Loader from '../Loader';

import './card.css';

const Card  = (props) => {

  
  const { title , data , color , iconName , isDataArrived : checker } = props;

  const toShow = addingCommasToNumbers(data);

  return (

    <div className = {`car890CardInnerContainer car489${color}`}>

      <div className = "car890Title">{title}</div>
      <div>
        <i className = {`${ICONS[iconName]}`}></i>
      </div>
      {!checker ? <Loader /> :<div className = "car890Count">{toShow}</div>}

    </div>

  );

}

export default Card;
