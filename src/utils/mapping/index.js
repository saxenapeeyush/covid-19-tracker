export const mapTableFetchedDataToArr = () => {

  const arr = [];

      for(let obj in data) {
        const newObj = {
          tag : obj,
          name : COUNTRY_CODE[obj],
          data :data[obj]
      }

    arr.push(newObj);
  }
  return arr; 

}
