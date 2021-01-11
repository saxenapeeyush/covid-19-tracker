import React from 'react';
import { useInView } from 'react-intersection-observer';

import { TABLE } from '../../utils/configs/table';

import TableTag from './TableTag';
import TableContent from './TableContent';
import Loader from '../Loader';

import './table.css';

const Table = (props) => {

  const { ref, inView, entry } = useInView({
    /* Optional options */
    root:null,
    threshold: 0,
    rootMargin: '0px',
  });

  const { data , isDataArrived , sortDataOnCheck } = props;

  return (

    <div>
      <div onClick = {sortDataOnCheck} ref ={ref} className = {`tab760TableContainer ${entry && entry.isIntersecting ? "" : ""}`}>
      {TABLE.map(({name,tag},idx) => {
        
        return <TableTag tag = {tag} name = {name} key = {idx}/>

      })}
      

    </div>

    {!isDataArrived ? <Loader/>: (<div>

      {data.map((curCountry,idx) => {

        return <TableContent object = {curCountry} key = {idx}/>
        
      })}

    </div>)}
    </div>

  );
}

export default Table;
