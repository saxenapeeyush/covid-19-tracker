import { combineReducers } from 'redux';

const tableReducers = (oldListDataTable = [] , action) => {
  
  const { type , payload } = action;

  switch(type) {
    
    case 'FETCH_TABLE_DATA' : return payload;

    default : return oldListDataTable;
  }

}

const reducers = combineReducers({tableReducers});

export default reducers;
