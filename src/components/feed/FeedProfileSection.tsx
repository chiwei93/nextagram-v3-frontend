import { Link } from 'react-router-dom';
import { UserData } from '../../types';
import classes from './FeedProfileSection.module.css';

interface PropsType {
  user: UserData;
}

const FeedProfileSection: React.FC<PropsType> = ({ user }) => {
  //if user is undefined
  if (!user) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.profileCard}>
        <div className={classes.imageContainer}>
          <img src={user.profileImage} alt={user.name} />
        </div>

        <Link to="/me" className={classes.link}>
          {user.name}
        </Link>

        <div className={classes.statContainer}>
          {user.numLikes}
          <span className={classes.statText}>LIKES</span>
        </div>

        <div className={classes.statContainer}>
          {user.numFollowers}
          <span className={classes.statText}>FOLLOWERS</span>
        </div>
      </div>
    </div>
  );
};

export default FeedProfileSection;
