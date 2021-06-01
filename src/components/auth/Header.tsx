import React from 'react';

import classes from './Header.module.css';

interface PropsType {
  image: string;
  heading: string;
}

const Header: React.FC<PropsType> = ({ image, heading }) => {
  return (
    <div className={classes.header}>
      <div className={classes.imgContainer}>
        <img src={image} alt="login" />
      </div>

      <h4 className={classes.heading}>{heading}</h4>
    </div>
  );
};

export default Header;
