import React from 'react';
import { Redirect , Link } from 'react-router-dom';

import './error.css';

const Error = () => {

  return (
    <div className = "err395ErrorContainer">

      <div>

        <div className = "err395ErrorTopic">You have entered a wrong URL </div>

        <Link to = "/">Home Page</Link>

      
      </div>

    </div>
  );

}

export default Error;
