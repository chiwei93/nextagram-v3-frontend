import { Link } from 'react-router-dom';
import useGlobalContext from '../../store';

import classes from './HomeBtn.module.css';

const HomeBtn: React.FC = () => {
  const { isLogin } = useGlobalContext();

  const path = isLogin ? '/home' : '/';

  return (
    <Link to={path} className={classes.btn}>
      Home
    </Link>
  );
};

export default HomeBtn;
