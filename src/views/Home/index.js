import React from 'react';

import { Instance } from '../../utils/configs/axios';

import Card from '../../common/Card';

import './home.css';

class Home extends React.Component {

  constructor(props) {

    super(props);

    this.state = {totalConfirmed : -1,totalActive : -1,totalRecovered:-1,totalDeceased : -1 , isDataArrived : false};

  }

  componentDidMount() {

    this.getData();

  }

  render() {

    return (

      <div>This is Home

        {this.getCards()}

      </div>

    );

  }

  getData = async () => {

    const allData = await Instance.get('/v4/min/data.min.json');

    const data = allData?.data;

    let totalConfirmed = 0,totalActive = 0,totalRecovered = 0,totalDeceased = 0;

    for(let country in data) {
  
      const totalObj = data[country]['total'];

      const confirm = totalObj.confirmed;
      const active = totalObj.tested;
      const recovered = totalObj.recovered;
      const deceased = totalObj.deceased;

      totalConfirmed+=confirm;
      totalActive+=active;
      totalRecovered+=recovered;
      totalDeceased+=deceased;

    }

    this.setState({isDataArrived:true,totalConfirmed,totalActive,totalRecovered,totalDeceased});

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

}

export default Home;
