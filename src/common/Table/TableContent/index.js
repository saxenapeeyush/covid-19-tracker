import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import  { COUNTRY_CODE } from '../../../utils/configs/country';
import { ICONS } from '../../../utils/configs/icons';
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
  let toShowCurTested = convertingNumber(delta?.tested);
  let toShowCurConfirmed = convertingNumber(delta?.confirmed);
  let toShowCurRecovered = convertingNumber(delta?.recovered);
  let toShowCurDeceased = convertingNumber(delta?.deceased);
  
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

      <div className = "tc903TableContentMainBox">{toShowConfirmed ? toShowConfirmed : 0} 
      <span className = "tc903TableContentConfirmedMore">{delta && delta.confirmed ? <i className = {ICONS['arrow-up']}></i>:null} 
        {delta && delta.confirmed ? toShowCurConfirmed : null }
      </span>
      </div>

      <div className = "tc903TableContentMainBox">{toShowRecovered ? toShowRecovered : 0} 
      <span className = "tc903TableContentRecoveredMore">{delta && delta.recovered ? <i className = {ICONS['arrow-up']}></i>:null}
      {delta && delta.recovered ? toShowCurRecovered : null }
      </span></div>

      <div className = "tc903TableContentMainBox">{toShowDeceased ? toShowDeceased : 0} 
      <span className = "tc903TableContentDeceasedMore">{delta && delta.deceased ? <i className = {ICONS['arrow-up']}></i>:null}
      {delta && delta.deceased ? toShowCurDeceased : null }
      </span></div>

      <div className = "tc903TableContentMainBox">{toShowTested ? toShowTested : 0} <span className = "tc903TableContentTestedMore">{delta && delta.tested ? <i className = {ICONS['arrow-up']}></i>:null}
      {delta && delta.tested ? toShowCurTested : null }
      </span></div>

      <div>{recoveryRatio ? recoveryRatio : 0}%</div>

      <div>{caseFatelityRatio ? caseFatelityRatio : 0}%</div>

      <div>{testRatio ? testRatio : 0}%</div>

      <div>{toShowPopulation ? toShowPopulation : "Unknown"}</div>

    </Link>
    </div>
  );

})

export default TableContent;
