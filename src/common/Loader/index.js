import React from 'react';

import { ICONS } from '../../utils/configs/icons';

import './loader.css';

const Loader = (props) => {

  return (

    <div className = "load357LoaderContainer">
      <i className = {`load357Loader ${ICONS.spinner}`}></i>
    </div>

  );

}

export default Loader;
