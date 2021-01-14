import React from 'react';

import NotificationBar from './NotificationBar';

const Notification = (props) => {

  const myMap = new Map();

  const { data , toShow } = props;

  const updatedData = data.map((obj1) => {

    const newObj = {
      
      data : obj1,

      dateTime : new Date(obj1['timestamp'] * 1000)
   
    }

    return newObj;

  });

  for(const curObject of updatedData) {

    const date = curObject['dateTime'];

    const uniqueKey = date.getDate() + "" + date.getMonth() + date.getFullYear();

    if(!myMap.has(uniqueKey)) { //1202021 : {date : "",data : []}

      const objArr = [];

      objArr.push(curObject);

      const newObj = {
        date : date,
        data : objArr
      }

      myMap.set(uniqueKey,newObj);
    
    }
    else {

      myMap.get(uniqueKey)['data'].push(curObject);

    }

  }

  const newArr = Array.from(myMap);

  const updatedArr = [];

  for(const arr of newArr) {

    updatedArr.push(arr[1]);
  
  }

  updatedArr.sort((obj1,obj2) => {

    return obj2.date - obj1.date;
  
  });

  const newArr1 = updatedArr.slice(0,3);



    if(toShow) {

    return <div>

      {newArr1.map((curObject,idx) => {

        if(idx > 4) return null; 

        return <NotificationBar key = {idx} curData = {curObject}/>

      })}

    </div>
    
  }else return null;

}

export default React.memo(Notification);
