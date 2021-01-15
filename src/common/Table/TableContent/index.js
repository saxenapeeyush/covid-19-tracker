import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import  { COUNTRY_CODE } from '../../../utils/configs/country';
import { addingCommasToNumbers ,convertingNumber } from '../../../utils/helpers/helper';

import './tableContent.css';

const TableContent = forwardRef((props,ref) =>  {

  const { object } = props;

  const { tag , data } = object;

  const { total , meta , delta } = data;

  const population = meta?.population;

  const { confirmed , recovered , deceased , tested } = total;


  let toShowConfirmed = convertingNumber(confirmed);
  let toShowRecovered = convertingNumber(recovered);
  let toShowDeceased = convertingNumber(deceased);
  let toShowTested = convertingNumber(tested); 
  let toShowPopulation = convertingNumber(population);


  if(toShowConfirmed && !toShowConfirmed.toString().includes("L") && !toShowConfirmed.toString().includes("Cr")){
    toShowConfirmed = addingCommasToNumbers(toShowConfirmed);
  }

  if(toShowRecovered && !toShowRecovered.toString().includes("L") && !toShowRecovered.toString().includes("Cr")){
    toShowRecovered = addingCommasToNumbers(toShowRecovered);
  }

  if(toShowDeceased && !toShowDeceased.toString().includes("L") && !toShowDeceased.toString().includes("Cr")){
    toShowDeceased = addingCommasToNumbers(toShowDeceased);
  }

  if(toShowTested && !toShowTested.toString().includes("L") && !toShowTested.toString().includes("Cr")){
    toShowTested = addingCommasToNumbers(toShowTested);
  }

  if(toShowPopulation && !toShowPopulation.toString().includes("L") && !toShowPopulation.toString().includes("Cr")){
    toShowPopulation = addingCommasToNumbers(toShowPopulation);
  }
  
  let test  = isNaN(tested/population) ? 0 : (tested/population);

  let recovery = isNaN(recovered/population) ? 0 : (recovered/population);

  let caseFatelity = isNaN(deceased/population) ? 0 : (deceased/population);

  let testRatio = (test*100).toFixed(1);
  let recoveryRatio = (recovery*100).toFixed(1);
  let caseFatelityRatio = (caseFatelity*100).toFixed(1);

  const newTo = {

    pathname: (tag.length < 3) ? `/state/${tag}` : "/", 

  };

  return (
    <div ref ={ref}><Link to = {newTo} className = "tc903TableContentContainer">

      <div className = "tc903TableContent">{tag.length < 3 ? COUNTRY_CODE[tag] : tag}</div>

      <div>{toShowConfirmed ? toShowConfirmed : 0} 
      <span className = "tc903TableContentConfirmedMore">{delta ? delta.confirmed:null}</span>
      </div>

      <div>{toShowRecovered ? toShowConfirmed : 0} 
      <span className = "tc903TableContentRecoveredMore">{delta ? delta.recovered:null}</span></div>

      <div>{toShowDeceased ? toShowDeceased : 0} 
      <span className = "tc903TableContentDeceasedMore">{delta ? delta.deceased:null}</span></div>

      <div>{toShowTested ? toShowTested : 0} <span className = "tc903TableContentTestedMore">{delta ? delta.tested:null}</span></div>

      <div>{recoveryRatio ? recoveryRatio : 0}%</div>

      <div>{caseFatelityRatio ? caseFatelityRatio : 0}%</div>

      <div>{testRatio ? testRatio : 0}%</div>

      <div>{toShowPopulation ? toShowPopulation : "Unknown"}</div>

    </Link>
    </div>
  );

})

export default TableContent;
