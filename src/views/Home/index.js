import React from 'react';

import { Instance } from '../../utils/configs/axios';
import { COUNTRY_CODE } from '../../utils/configs/country';
import { SORT_DATA } from '../../utils/helpers/sorting';

import Card from '../../common/Card';
import Table from '../../common/Table';
import Input from '../../ui/Input';
import Box from '../../common/Box';
import Notification from '../../common/Notification';
import DateTime from '../../common/DateTime';
import Header from '../../common/Header';

import './home.css';
import { ICONS } from '../../utils/configs/icons';

class Home extends React.Component {

  constructor(props) {


    super(props);

    this.debounce = null;

    this.state = {
      totalConfirmed : 0,
      totalActive : 0,
      totalRecovered: 0,
      totalDeceased : 0,
      isDataArrived : false,
      allData : [],
      boxData :[],
      inputBoxValue : '',
      notificationData : [],
      toShowNotification : false,
      currentDate: new Date(),
      isSorted : {
        curState : 'st',
        isAscending : true
      }
    };

  }

  componentDidMount() {

    this.getTableData();

    this.getNotificationData();

  }

  componentWillUnmount() {

    this.setState = (state,callback)=>{ return; };
}

  render() {

    const { toShowNotification , currentDate } = this.state;

    return (

      <div>

        {this.getHeader()}

        {this.getSearchBox()}

        <div>

          <div className = "ho378DateNotifContainer">

            <DateTime currentDate = {currentDate}/>

            <i onClick = {this.showNotification} className = {`ho378HomeBellIconNotif ${toShowNotification ? ICONS['bell-slash'] : ICONS.bell}`}></i>
          
          </div>

        </div>

        {this.getNotificationBar()}

        {this.getCards()}

        {this.getTable()}

      </div>

    );

  }

  getHeader = () => {

    return <Header headerTopic = "India"/>

  }

  showNotification = () => {

    const { toShowNotification } = this.state;

    this.setState({toShowNotification : !toShowNotification});

  }

  getNotificationData = async () => {

    const allData = await Instance.get('/updatelog/log.json');

    const data = allData?.data;

    this.setState({notificationData : data});

  }


  getTableData = async () => {

    const allData = await Instance.get('/v4/min/data.min.json');

    const data = allData?.data;

    let totalConfirmed = 0,totalActive = 0,totalRecovered = 0,totalDeceased = 0;

  
      const totalObj = data['TT']['total'];

      const confirm = totalObj.confirmed;
      const active = totalObj.tested;
      const recovered = totalObj.recovered;
      const deceased = totalObj.deceased;

      totalConfirmed+=confirm;
      totalActive+=active;
      totalRecovered+=recovered;
      totalDeceased+=deceased;

      const arr = [];

      for(let obj in data) {
        const newObj = {
          tag : obj,
          name : COUNTRY_CODE[obj],
          data :data[obj]
      }

    arr.push(newObj);

  } 

      this.setState({isDataArrived:true,totalConfirmed,totalActive,totalRecovered,totalDeceased,allData : arr});

  }

  getCards = () => {

  const { totalConfirmed , totalActive , totalRecovered , totalDeceased , isDataArrived } = this.state;
   
   return ( <div className = "ho378CardContainer">

      <Card isDataArrived = {isDataArrived} title = "Confirmed" data = {totalConfirmed} color = "red" iconName = "check-circle"/>

      <Card isDataArrived = {isDataArrived} title = "Tested" data = {totalActive} color = "blue" iconName = "thermometer"/>

      <Card isDataArrived = {isDataArrived} title = "Recovered" data = {totalRecovered} color ="green" iconName = "battery-full"/>

      <Card isDataArrived = {isDataArrived} title = "Deceased" data = {totalDeceased} color="default" iconName = "battery-empty"/>

    </div>

   );

  }

  getTable = () => {

    const { allData , isDataArrived , isSorted } = this.state;

    return <Table isDistrict = {false} isSortedData = {isSorted} sortDataOnCheck = {this.sortData} isDataArrived = {isDataArrived} data = {allData}/>;

  }

  getNotificationBar = () => {

    const { notificationData , toShowNotification } = this.state;

    return (
      <div className = "ho378NotifContainer"><Notification toShow = {toShowNotification} data = {notificationData}/></div>
    );

  }

  sortData = (event) => {

    const { isSorted , allData } = this.state;

    const newSortedObj = {...isSorted};

    const tag = event.target.getAttribute('tag');

    if(!tag) return;

    if(newSortedObj.curState === tag) {

      const data = SORT_DATA(tag,allData,!newSortedObj.isAscending);

      newSortedObj.isAscending = !newSortedObj.isAscending;
  
      this.setState({allData:data,isSorted : newSortedObj});

    }else{

      const data = SORT_DATA(tag,allData,newSortedObj.isAscending);

      newSortedObj.curState = tag;

      this.setState({allData:data,isSorted : newSortedObj});

    }

  }

  getSearchBox = () => {

    const { inputBoxValue , boxData } = this.state;

    return (
      <div className = "ho378HomeInputBoxContainer">

        <div  className ="ho378HomeInputInnerBoxContainer">
        <Input iconName = "search" label = "Search your state" value = {inputBoxValue} type = "text" placeholder = "Search your state" onChange = {this.searchInput}/>

        <Box value = {inputBoxValue} data = {boxData}/>
        </div>

      </div> 
    );
  }

  searchInput = (event) => {

    clearTimeout(this.debounce);

    const target = event.target.value;

    this.setState({inputBoxValue : target});

    this.debounce = setTimeout(() => {

        this.searchBoxHandler(target);

    },300);


  }

  searchBoxHandler = (target) => {

    if(target.length === 0) {

      this.setState({boxData :[]});

      return;

    }

    const { allData }  = this.state;

    const newData = [...allData];

    const updatedData = newData.filter((curObj) => {

      return (curObj['name'].includes(target));

    });
    

    this.setState({boxData : updatedData,inputBoxValue:target});


  }

}

export default Home;
