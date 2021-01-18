const sortByConRecDecTes = (tagLine,allData,isAscending) => {

  const newData = [...allData];

  newData.sort((obj1,obj2) => {

    let first = obj1?.data?.total?.[`${tagLine}`];

    let second = obj2?.data?.total?.[`${tagLine}`];

    if(!first) first = 0;
    if(!second) second = 0;

    return isAscending ? first - second : second - first;

  });

    return newData;

}

const sortByConRecDecTesRatio = (tagLine,allData,isAscending) => {

  const newData = [...allData];

  newData.sort((obj1,obj2) => {

    let first = obj1?.data?.total?.[`${tagLine}`];

    let second = obj2?.data?.total?.[`${tagLine}`];

    let firstPopulation = obj1?.data?.meta?.population;

    let secondPopulation = obj2?.data?.meta?.population;

    if(!first) first  = 0;

    else if(!firstPopulation) firstPopulation = 0;

    if(!second) second  = 0;
    
    else if(!secondPopulation) secondPopulation = 0;

    const firstType = isNaN(first/firstPopulation) ? 0 : (first/firstPopulation);

    const secondType = isNaN(second/secondPopulation)?0:(second/secondPopulation);


    return isAscending ? firstType - secondType : secondType - firstType;

  });

    return newData;

}


const sortByPopulation = (tagLine,allData,isAscending) => {

  const newData = [...allData];


  newData.sort((obj1,obj2) => {

    let first = obj1?.data?.meta?.[`${tagLine}`];

    let second = obj2?.data?.meta?.[`${tagLine}`];

    if(!first) first = 0;
    if(!second) second = 0;

    return isAscending ? first - second : second - first;

  });

  return newData;

}

const sortByStateName = (allData,isAscending) => {

  const newData = [...allData];

  newData.sort((obj1,obj2) => {

    return isAscending ? obj1['name'].localeCompare(obj2['name']) : obj2['name'].localeCompare(obj1['name']);

  });

  return newData;

}

export const sortData = (tag,allData,isAscending) => {

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
    return sortByConRecDecTes(tagLine,allData,isAscending);
  
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
    return sortByConRecDecTesRatio(tagLine,allData,isAscending);

  }

  else if(tag === 'pop') {


    return sortByPopulation('population',allData,isAscending);

  }
  else if(tag === 'st') {

    return sortByStateName(allData,isAscending);

  }

}

