import React from 'react';

import { ICONS } from '../../../utils/configs/icons';

import './tableTag.css';

const TableTag = (props) => {

  const { tag , name , curState , isAscending } = props;

  return (
    <div className ={`tabt982TableTag ${curState === tag ? "tab760TableContStrongSelect":""}`} tag = {tag}>

      {name}
      <div className = {`${isAscending ? "tabt982TableIconAsc" : "tabt982TableIconDesc"}`}>
        {(curState === tag) ? (isAscending) ? <i className = {ICONS['sort-up']}></i> : <i className = {ICONS['sort-down']}></i> : null}
      </div>
      </div>
  )

}

export default TableTag;
