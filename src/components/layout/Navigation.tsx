import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useGlobalContext from '../../store';
import toastify from '../../util/toast';
import Logo from './Logo';
import classes from './Navigation.module.css';

const Navigation: React.FC = () => {
  const history = useHistory();

  const { isLogin, checkIsLogin, loggedOut } = useGlobalContext();

  // check login status
  useEffect(() => {
    checkIsLogin();
  }, [isLogin, checkIsLogin]);

  //handling the logout process
  const onLogoutBtnClick = () => {
    loggedOut();

    //navigate the index page
    history.push('/');

    //notify user
    toastify(true, 'Logged out successfully!');
  };

  return (
    <nav className={classes.nav}>
      <Logo />

      <ul className={classes.linkList}>
        {!isLogin && (
          <li className={classes.linkItem}>
            <Link to="/login" className={classes.link}>
              Log In
            </Link>
          </li>
        )}
        {!isLogin && (
          <li className={classes.linkItem}>
            <Link to="/signup" className={classes.link}>
              Sign Up
            </Link>
          </li>
        )}
        {isLogin && (
          <li className={classes.linkItem}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
          </li>
        )}
        {isLogin && (
          <li className={classes.linkItem}>
            <Link to="/me" className={classes.link}>
              Profile
            </Link>
          </li>
        )}
        {isLogin && (
          <li className={classes.linkItem}>
            <button
              className={`${classes.btn} ${classes.link}`}
              onClick={onLogoutBtnClick}
            >
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
