import React from 'react';

import { Instance } from '../../utils/configs/axios';
import { COUNTRY_CODE } from '../../utils/configs/country';
import { SORT_DATA } from '../../utils/helpers/sorting';

import Card from '../../common/Card';
import Table from '../../common/Table';
import Input from '../../ui/Input';
import Box from '../../common/Box';

import './home.css';

class Home extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      totalConfirmed : 0,
      totalActive : 0,
      totalRecovered: 0,
      totalDeceased : 0 ,
      isDataArrived : false,
      allData : [],
      boxData :[],
      inputBoxValue : '',
    };

  }

  componentDidMount() {

    this.getData();

  }

  render() {

    return (

      <div>

        {this.getSearchBox()}

        {this.getCards()}

        {this.getTable()}

      </div>

    );

  }

  getData = async () => {

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

    setTimeout(() => {

      this.setState({isDataArrived:true,totalConfirmed,totalActive,totalRecovered,totalDeceased,allData : arr});

    },800);

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

    const { allData , isDataArrived } = this.state;

    return <Table sortDataOnCheck = {this.sortData} isDataArrived = {isDataArrived} data = {allData}/>;

  }

  sortData = (event) => {

    const tag = event.target.getAttribute('tag');

    if(!tag) return;

    const { allData } = this.state;

    const data = SORT_DATA(tag,allData);

    this.setState({allData:data});

  }

  getSearchBox = () => {

    const { inputBoxValue , boxData } = this.state;

    return (
      <div className = "ho378HomeInputBoxContainer">

        {/* <SingleDiv data = "Search your state"/> */}

        <Input label = "Search you state" value = {inputBoxValue} type = "text" placeholder = "Maharasthra,Delhi..." onChange = {this.searchInput}/>

        <Box data = {boxData}/>

      </div> 
    );
  }


  normalFunction = (event) => {

    const target = event.target.value;

    console.log(target);

    this.searchBoxHandler(target);

    // this.setState({inputBoxValue : target});


  }

  betterFunction = this.debounceSearchBoxHandler(this.normalFunction,300);

  searchInput = (event) => {

    const target = event.target.value;

    // this.debounceSearchBoxHandler(this.searchBoxHandler,300);

    this.setState({inputBoxValue : target});

    this.searchBoxHandler(target);


  }

  debounceSearchBoxHandler(normalFn,delay) {

    let timer = 0;

    return function(...args) {

      let myThis = this;

      clearTimeout(timer);

      timer = setTimeout(() => {

        normalFn.apply(myThis,args);

      },delay);
    }

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
