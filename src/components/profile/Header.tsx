import { FaPen } from 'react-icons/fa';

import { UserData } from '../../types';
import FollowBtn from '../feed/FollowBtn';
import classes from './Header.module.css';

interface PropsType {
  openProfileModal?: () => void;
  openUploadModal?: () => void;
  profileImage: string;
  user: UserData;
  isCurrentUserPage: boolean;
  isFollowed?: boolean;
  toggleFollow?: () => void;
}

const Header: React.FC<PropsType> = ({
  openProfileModal,
  openUploadModal,
  profileImage,
  user,
  isCurrentUserPage,
  isFollowed,
  toggleFollow,
}) => {
  return (
    <div className={classes.container}>
      <div className={`${classes.center} ${classes.outerContainer}`}>
        <div className={classes.imageContainer}>
          <img src={profileImage} alt={user.name} />
          {isCurrentUserPage && (
            <button className={classes.btnProfile} onClick={openProfileModal}>
              <FaPen />
            </button>
          )}
        </div>
      </div>

      <div className={classes.infoContainer}>
        <p className={classes.username}>{user.name}</p>

        <div className={classes.statContainer}>
          <div className={classes.marRight}>
            <p className={classes.statNum}>{user.numLikes}</p>
            <p className={classes.statText}>Likes</p>
          </div>

          <div>
            <p className={classes.statNum}>{user.numFollowers}</p>
            <p className={classes.statText}>Followers</p>
          </div>
        </div>

        <div className={classes.center}>
          {isCurrentUserPage && (
            <button className={classes.btnUpload} onClick={openUploadModal}>
              Upload Photo
            </button>
          )}
          {!isCurrentUserPage && (
            <FollowBtn followed={isFollowed} toggleFollow={toggleFollow} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
