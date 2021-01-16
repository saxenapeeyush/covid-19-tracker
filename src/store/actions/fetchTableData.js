import Instance from '../../utils/configs/axios';

import { mapTableFetchedDataToArr } from '../../utils/mapping';

const fetchTableData = () => {

  return async (dispatch) => {

    const data  = await Instance.get('/v4/min/data.min.json');

    const toShow = mapTableFetchedDataToArr(data.data);

    const actionCreated = {type : "FETCH_TABLE_DATA",payload:toShow};

    dispatch(actionCreated);

  }

}

export default fetchTableData;
