import { Link } from 'react-router-dom';

import hero from '../../images/hero.png';
import classes from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <div>
      <img src={hero} alt="hero" className={classes.image} />

      <div className={classes.textContainer}>
        <p className={classes.bold}>
          Share with and view photos from people around the world
        </p>

        <p className={classes.gray}>
          Sign in to start sharing with other users now
        </p>
      </div>

      <div className={classes.btnContainer}>
        <ul className={classes.list}>
          <li className={classes.item}>
            <Link to="/login" className={classes.link}>
              Log In
            </Link>
          </li>
          <li className={classes.item}>
            <Link to="/signup" className={classes.link}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
