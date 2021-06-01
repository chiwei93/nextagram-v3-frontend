import { Link } from 'react-router-dom';

import Logo from './Logo';
import classes from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <Logo />
      <ul className={classes.list}>
        <li className={classes.item}>
          <Link to="/about" className={classes.link}>
            About Us
          </Link>
        </li>
        <li className={classes.item}>
          <Link to="/terms" className={classes.link}>
            Terms
          </Link>
        </li>
        <li className={classes.item}>
          <Link to="/contact" className={classes.link}>
            Contact Us
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
