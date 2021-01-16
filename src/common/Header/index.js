import React from 'react';
import { Link } from 'react-router-dom';

import LogoImg from '../../ui/imgs/logo.png';

import './header.css';

const Header = (props) => {

  const { headerTopic } = props;

  return (

    <div className = "head681HeaderContainer">

      <Link to = "/"> <div><img src = {LogoImg} /></div></Link>

      <div className = "head681MainHeading">{headerTopic}</div>

    </div>

  );

}

export default Header;
