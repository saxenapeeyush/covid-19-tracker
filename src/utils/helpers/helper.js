export const addingCommasToNumbers = (number) => {
  return Intl.NumberFormat('en-IN').format(number);
}

export const convertingNumber = (value) => {

  if(!convertingNumber) return 0;

  if (value >= 10000000) {

    value = (value / 10000000).toFixed(1) + 'Cr';

  } else if (value >= 100000) {

    value = (value / 100000).toFixed(1) + 'L';
  }

  if(value && !value.toString().includes("L") && !value.toString().includes("Cr")){
    value = addingCommasToNumbers(value);
  }

  return value;
  
}

export const timeDifference = (current, previous) => {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
       return "About " + Math.round(elapsed/1000) + ' seconds ago';   
  }

  else if (elapsed < msPerHour) {
       return "About " + Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }

  else if (elapsed < msPerDay ) {
       return "About " + Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
      return "About "  + Math.round(elapsed/msPerDay) + ' days ago';   
  }

  else if (elapsed < msPerYear) {
      return "About "  + Math.round(elapsed/msPerMonth) + ' months ago';   
  }

  else {
      return "About "  + Math.round(elapsed/msPerYear ) + ' years ago';   
  }
}


