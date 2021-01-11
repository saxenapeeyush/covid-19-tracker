import React from 'react';

import './tableTag.css';

const TableTag = (props) => {

  const { tag , name } = props;

  return (
    <div className ="tabt982TableTag" tag = {tag}>

      {name}</div>
  )

}

export default TableTag;
