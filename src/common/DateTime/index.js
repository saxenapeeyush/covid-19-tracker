import React from 'react';

import './dateTime.css';

const DateTime = (props) => {

  const { currentDate } = props;

  return (

    <div className ="dt862CurrentDateTime">{currentDate.toDateString()}, {currentDate.toLocaleTimeString()} IST</div>

  );

}

export default DateTime;
