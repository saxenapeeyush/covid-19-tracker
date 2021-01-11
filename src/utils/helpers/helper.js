export const addingCommasToNumber = (x) => {
  if (x != null) {
    let isNegativeNumber = false;
    x = x.toString();
    if (x.charAt(0) == '-') {
      x = x.substr(1);
      isNegativeNumber = true;
    }
    let afterPoint = '';
    if (x.indexOf('.') > 0)
      afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    if (isNegativeNumber) {
      return '-' + res
    } else {
      return res;
    }
  } else {
    return false
  }
}

export const addingCommasToNumbers = (number) => {
  return Intl.NumberFormat('en-IN').format(number);
}
