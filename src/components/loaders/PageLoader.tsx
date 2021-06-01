import classes from './PageLoader.module.css';

const PageLoader: React.FC = () => {
  return (
    <div className={classes.container}>
      <ul className={classes.barContainer}>
        <li className={classes.bar}></li>
        <li className={classes.bar}></li>
        <li className={classes.bar}></li>
        <li className={classes.bar}></li>
      </ul>
    </div>
  );
};

export default PageLoader;
