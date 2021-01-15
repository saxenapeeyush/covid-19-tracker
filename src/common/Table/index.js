import React from 'react';
import FlipMove from 'react-flip-move';
// import { connect } from 'react-redux';

import { TABLE } from '../../utils/configs/table';

import TableTag from './TableTag';
import TableContent from './TableContent';
import Loader from '../Loader';

import './table.css';

const Table = (props) => {

  const { data , isDataArrived , sortDataOnCheck , isSortedData , isDistrict } = props;

  const  { isAscending , curState } = isSortedData;

  console.log(data);

  return (

    <div>
      <div onClick = {sortDataOnCheck} className = {`tab760TableContainer`}>
      {TABLE.map(({name,tag},idx) => {

        const newName = isDistrict && tag ==='st' ? "District" : name;
        
        return <TableTag isAscending = {isAscending} curState = {curState} tag = {tag} name = {newName} key = {idx}/>

      })}

    </div>

    {!isDataArrived ? <Loader/>: (<FlipMove>

      {data.map((curCountry,idx) => {

        return <TableContent object = {curCountry} key = {curCountry['tag']}/>
        
      })}
    </FlipMove>)}
    </div>

  );
}

export default Table;
