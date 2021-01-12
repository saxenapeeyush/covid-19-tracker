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

  return value;
  
}


