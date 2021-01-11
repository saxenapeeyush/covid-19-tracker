import React from 'react';
import { Link } from 'react-router-dom';

import  { COUNTRY_CODE } from '../../../utils/configs/country';
import { addingCommasToNumbers ,convertingNumber } from '../../../utils/helpers/helper';

import './tableContent.css';

const TableContent = (props) =>  {

  const { object } = props;

  const { tag , data } = object;

  const { total , meta } = data;

  const { population } = meta;

  const { confirmed , recovered , deceased , tested } = total;


  let toShowConfirmed = convertingNumber(confirmed);
  let toShowRecovered = convertingNumber(recovered);
  let toShowDeceased = convertingNumber(deceased);
  let toShowTested = convertingNumber(tested); 
  let toShowPopulation = convertingNumber(population);

  if(!toShowConfirmed.toString().includes("L") && !toShowConfirmed.toString().includes("Cr")){
    toShowConfirmed = addingCommasToNumbers(toShowConfirmed);
  }

  if(!toShowRecovered.toString().includes("L") && !toShowRecovered.toString().includes("Cr")){
    toShowRecovered = addingCommasToNumbers(toShowRecovered);
  }

  if(!toShowDeceased.toString().includes("L") && !toShowDeceased.toString().includes("Cr")){
    toShowDeceased = addingCommasToNumbers(toShowDeceased);
  }

  if(!toShowTested.toString().includes("L") && !toShowTested.toString().includes("Cr")){
    toShowTested = addingCommasToNumbers(toShowTested);
  }

  if(!toShowPopulation.toString().includes("L") && !toShowPopulation.toString().includes("Cr")){
    toShowPopulation = addingCommasToNumbers(toShowPopulation);
  }
  

  let testRatio = ((tested/population)*100).toFixed(1);
  let recoveryRatio = ((recovered/population)*100).toFixed(1);
  let caseFatelityRatio = ((deceased/population)*100).toFixed(1);

  const newTo = { 
    pathname: `/state/${tag}`, 
    param1: data['districts'] 
  };

  return (
    <Link to = {newTo} className = "tc903TableContentContainer">

      <div className = "tc903TableContent">{COUNTRY_CODE[tag]}</div>

      <div>{toShowConfirmed}</div>

      <div>{toShowRecovered}</div>

      <div>{toShowDeceased}</div>

      <div>{toShowTested}</div>

      <div>{recoveryRatio}%</div>

      <div>{caseFatelityRatio}%</div>

      <div>{testRatio}%</div>

      <div>{toShowPopulation}</div>

    </Link>
  );

}

export default TableContent;
