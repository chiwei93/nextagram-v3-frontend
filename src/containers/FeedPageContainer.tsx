import classes from './FeedPageContainer.module.css';

const FeedPageContainer: React.FC = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default FeedPageContainer;
