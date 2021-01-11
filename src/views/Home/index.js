import React from 'react';

import { Instance } from '../../utils/configs/axios';

import Card from '../../common/Card';
import Table from '../../common/Table';

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
      allData : '',
    };

  }

  componentDidMount() {

    this.getData();

  }

  render() {

    return (

      <div>

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


    let tagLine = '';

    if(tag === 'cn' || tag === 'rc' || tag === 'dc' || tag === 'te') {
      switch(tag) {
        case 'cn' : tagLine = 'confirmed';
                    break;
        case 'rc' : tagLine = "recovered";
                    break;
        case 'dc' : tagLine = 'deceased';
                    break;
        case 'te' : tagLine = 'tested';
                    break;
        default : tagLine = ''
      }
      this.sortByConRecDecTes(tagLine);
    
    }
    else if(tag === 'rr' || tag === 'cfr' || tag === 'tpr') {

      switch(tag) {

        case 'rr' : tagLine = 'recovered';
                    break;

        case 'cfr' : tagLine = "deceased";
                    break;

        case 'tpr' : tagLine = 'tested';
                    break;

        default : tagLine = '';

      }
      this.sortByConRecDecTesRatio(tagLine);

    }

    else if(tag === 'pop') {


      this.sortByPopulation('population');

    }
    else if(tag === 'st') {

      this.sortByStateName();

    }

  }

  sortByConRecDecTes = (tagLine) => {

    const { allData }  = this.state;
    const newData = [...allData];

    newData.sort((obj1,obj2) => {

      return obj1['data']['total'][tagLine] - obj2['data']['total'][tagLine];

    });

      this.setState({allData : newData});

  }

  sortByConRecDecTesRatio = (tagLine) => {

    const { allData }  = this.state;
    const newData = [...allData];

    newData.sort((obj1,obj2) => {

      return obj1['data']['total'][tagLine] / obj1['data']['meta']['population'] - obj2['data']['total'][tagLine] / obj2['data']['meta']['population'];

    });

      this.setState({allData : newData});

  }

  sortByPopulation = (tagLine) => {

    const { allData }  = this.state;
    const newData = [...allData];


    newData.sort((obj1,obj2) => {

      return obj1['data']['meta'][tagLine] - obj2['data']['meta'][tagLine];

    });

    this.setState({allData : newData});

  }

  sortByStateName = () => {

    const { allData }  = this.state;
    const newData = [...allData];

    newData.sort((obj1,obj2) => {

      return obj1['tag'].localeCompare(obj2['tag']);

    });

    this.setState({allData : newData});

  }

}

export default Home;
