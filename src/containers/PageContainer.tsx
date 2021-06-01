import classes from './PageContainer.module.css';

const PageContainer: React.FC = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default PageContainer;
