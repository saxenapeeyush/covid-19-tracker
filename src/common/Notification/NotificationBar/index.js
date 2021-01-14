import React from 'react';

import NotificationContent from './NotificationContent';

import './notificationBar.css';

const NotificationBar = (props) => {

  const { curData } = props;

  const { date , data } = curData;

  const toPrintDate = date.toDateString();

  data.sort((obj1,obj2) => {
    
    return obj2['dateTime'] - obj1['dateTime'];
  
  });


  return (

    <div>

      <div className = "nb521NotificationBarDate"> {toPrintDate}</div>

      <NotificationContent newData = {data}/>

    </div>

  );

}

export default NotificationBar;
