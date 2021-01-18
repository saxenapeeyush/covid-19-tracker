import React from 'react';
import { Instance } from '../../utils/configs/axios';

import { SORT_DATA } from '../../utils/helpers/sorting';
import { checkAndStoreLocalStorage } from '../../utils/storage';
import { COUNTRY_CODE } from '../../utils/configs/country';

import Card from '../../common/Card';
import Table from '../../common/Table';
import Header from '../../common/Header';

import './states.css';

class States extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      totalConfirmed : 0,
      totalActive : 0,
      totalRecovered: 0,
      totalDeceased : 0 ,
      isDataArrived : false,
      shouldRedirectError :false,
      allData : [],
      isSorted : {
        curState : 'st',
        isAscending : true
      }
    };

  }

  componentDidMount() {

    this.configState();

  }

  render() {

    const { shouldRedirectError } = this.state;

     if (shouldRedirectError) {
      setTimeout(() => {
        this.props.history.push('/');
     });
     return null;
    }

    return (

      <div>

        {this.getHeader()}

        {this.getCards()}

        {this.getTable()}

      </div>

    );
  }

  getHeader = () => {

    const { stateName } = this.props.match.params;

    return <Header headerTopic = {COUNTRY_CODE[stateName]} />

  }

  configState = async () => {

    const { stateName } = this.props.match.params;

    const allData = await checkAndStoreLocalStorage();

    const newData = allData;

    const data = newData[stateName];

    if(!data || stateName === 'TT') {
      this.setState({shouldRedirectError : true});
      return;
    }

    let totalConfirmed = 0,totalActive = 0,totalRecovered = 0,totalDeceased = 0;

  
      const totalObj = data['total'];

      const confirm = totalObj.confirmed;

      const active = totalObj.tested;

      const recovered = totalObj.recovered;

      const deceased = totalObj.deceased;

      totalConfirmed+=confirm;
      totalActive+=active;
      totalRecovered+=recovered;
      totalDeceased+=deceased;

      const arr = [];

      for(let obj in data['districts']) {
        const newObj = {
          tag : obj,
          name : obj,
          data :data['districts'][obj]
      }
        arr.push(newObj);

      }

      setTimeout(() => {

        this.setState({isDataArrived:true,totalConfirmed,totalActive,totalRecovered,totalDeceased,allData : arr});
  
      },800);
    }
getCards = () => {

  const { totalConfirmed , totalActive , totalRecovered , totalDeceased , isDataArrived } = this.state;
   
   return ( <div className = "st789StateContainer">

      <Card isDataArrived = {isDataArrived} title = "Confirmed" data = {totalConfirmed} color = "red" iconName = "check-circle"/>

      <Card isDataArrived = {isDataArrived} title = "Tested" data = {totalActive} color = "blue" iconName = "thermometer"/>

      <Card isDataArrived = {isDataArrived} title = "Recovered" data = {totalRecovered} color ="green" iconName = "battery-full"/>

      <Card isDataArrived = {isDataArrived} title = "Deceased" data = {totalDeceased} color="default" iconName = "battery-empty"/>

    </div>

   );

  }

  getTable = () => {

    const { allData , isDataArrived , isSorted } = this.state;

    return <Table isDistrict = {true} isSortedData = {isSorted} sortDataOnCheck = {this.sortData} isDataArrived = {isDataArrived} data = {allData}/>;

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


}

export default States;
