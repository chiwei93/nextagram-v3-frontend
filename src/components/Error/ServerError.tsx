import HomeBtn from './HomeBtn';
import classes from './ServerError.module.css';

interface PropsType {
  errorMsg: string;
}

const ServerError: React.FC<PropsType> = ({ errorMsg }) => {
  return (
    <div className={classes.container}>
      {errorMsg}
      <div className={classes.marTop}>
        <HomeBtn />
      </div>
    </div>
  );
};

export default ServerError;
