import React from 'react';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';

import { TABLE } from '../../utils/configs/table';

import TableTag from './TableTag';
import TableContent from './TableContent';
import Loader from '../Loader';

import './table.css';

const Table = (props) => {

  const { data , isDataArrived , sortDataOnCheck } = props;

  return (

    <div>
      <div onClick = {sortDataOnCheck} className = {`tab760TableContainer`}>
      {TABLE.map(({name,tag},idx) => {
        
        return <TableTag tag = {tag} name = {name} key = {idx}/>

      })}
      

    </div>

    {!isDataArrived ? <Loader/>: (<FlipMove>

      {data.map((curCountry,idx) => {
        
        // console.log(curCountry);

        return <TableContent object = {curCountry} key = {curCountry['tag']}/>
        
      })}
    </FlipMove>)}
    </div>

  );
}

export default Table;
