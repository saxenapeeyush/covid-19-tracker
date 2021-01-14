import React from 'react';

import  { timeDifference } from '../../../../utils/helpers/helper';

import './notificationContent.css';

const NotificationContent = (props) => {
  
  const { newData } = props;

  return (

    <div>

      {newData.map(({dateTime,data},idx) => {

            const updates = data['update'];

            const allUpdates = updates.split('\n');

            return ( 
            <div key ={idx} className = "nc671NotifContDataContainer">

              <div className = "nc671NotifContTimeDiff">{timeDifference(new Date(),dateTime)}</div>

              <div>{allUpdates.map((curData,idx1) => {

                return <div key = {idx1} className = "nc671NotifContData">{curData}</div>
              
              })}</div>
            
            </div>
            );

      })}

    </div>

  );

}

export default NotificationContent;
