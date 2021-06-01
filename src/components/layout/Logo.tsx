import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useGlobalContext from '../../store';
import classes from './Logo.module.css';

const Logo: React.FC = () => {
  const { isLogin, checkIsLogin } = useGlobalContext();

  //check login status
  useEffect(() => {
    checkIsLogin();
  }, [isLogin, checkIsLogin]);

  //determine the link path
  const link = isLogin ? '/home' : '/';

  return (
    <Link to={link} className={classes.logo}>
      Nextagram
    </Link>
  );
};

export default Logo;
