import { Instance } from '../configs/axios';

import { TIME_DELAY_BEFORE_CALLING_API_TABLE , TIME_DELAY_BEFORE_CALLING_API_NOTIFICATION } from '../configs/storage';
import { convertTimeStampDiffToMinutes } from '../helpers/helper';

const fetchDataFromApi = async () => {

  console.log("call lgi yaha pe");

  const allData = await Instance.get('/v4/min/data.min.json');

  if(localStorage) {

    const newData = JSON.stringify(allData.data);

    localStorage.setItem('allData',newData);

    const curTimeStamp = new Date().getTime();

    const setTimeLocalStorage = JSON.stringify(curTimeStamp);

    localStorage.setItem('curDateForTable',setTimeLocalStorage);

  }

  return allData.data;

}

export const checkAndStoreLocalStorage = async () => {


  if(localStorage && localStorage.getItem('allData')) {

    const rawPreviousDate = localStorage.getItem('curDateForTable');

    const previousDate = JSON.parse(rawPreviousDate);

    const curDate = new Date().getTime();

    const minutes = convertTimeStampDiffToMinutes(previousDate,curDate);

    if(minutes < TIME_DELAY_BEFORE_CALLING_API_TABLE) {

    const getData = localStorage.getItem('allData');

    const updatedData = JSON.parse(getData);

    return updatedData;

    }

    else {

      if(localStorage) {

      localStorage.removeItem('allData');

      localStorage.removeItem('curDateForTable');
      
    }

      return fetchDataFromApi();

    }

  }

  else  {

    return fetchDataFromApi();

  }
    
}

export const fetchNotificationDataFromApi = async () => {


  const allData = await Instance.get('/updatelog/log.json');

  if(localStorage) {

    const newData = JSON.stringify(allData.data);

    localStorage.setItem('notifData',newData);

    const curTimeStamp = new Date().getTime();

    const setTimeLocalStorage = JSON.stringify(curTimeStamp);

    localStorage.setItem('curDateForNotif',setTimeLocalStorage);

  }

  return allData.data;

}

export const checkAndStoreLocalStorageNotification = async () => {

  if(localStorage && localStorage.getItem('notifData')) {

    const rawPreviousDate = localStorage.getItem('curDateForNotif');

    const previousDate = JSON.parse(rawPreviousDate);

    const curDate = new Date().getTime();

    const minutes = convertTimeStampDiffToMinutes(previousDate,curDate);

    if(minutes < TIME_DELAY_BEFORE_CALLING_API_NOTIFICATION) {

    const getData = localStorage.getItem('notifData');

    const updatedData = JSON.parse(getData);

    return updatedData;

    }

    else {

      if(localStorage) {

        localStorage.removeItem('notifData');
      
      localStorage.removeItem('curDateForNotif');
      
    }

      return fetchNotificationDataFromApi();

    }

  }

  else  {

    return fetchNotificationDataFromApi();

  }
    
}
