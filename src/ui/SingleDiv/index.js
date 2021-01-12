import React from 'react';

import './singleDiv.css';

const SingleDiv = (props) => {

  const { data } = props;

  return (

    <div className = "sd594SingleDivContainer">
      <span>{data}</span>
    </div>

  );

}

export default SingleDiv;
