import classes from './ContentPageContainer.module.css';

const ContentPageContainer: React.FC = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default ContentPageContainer;
