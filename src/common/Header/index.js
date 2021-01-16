import React from 'react';

import LogoImg from '../../ui/imgs/logo.png';

import './header.css';

const Header = (props) => {

  const { headerTopic } = props;

  return (

    <div className = "head681HeaderContainer">

      <div><img src = {LogoImg} /></div>

      <div><h1>{headerTopic}</h1></div>

    </div>

  );

}

export default Header;
