import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import FollowBtn from './FollowBtn';
import { ImageData, UserData } from '../../types';
import classes from './UserInfoSection.module.css';
import { apiUrl } from '../../util/api';
import handleErrors from '../../util/handleErrors';

interface PropsType {
  image: ImageData;
}

const UserInfoSection: React.FC<PropsType> = ({ image }) => {
  const history = useHistory();

  //set states
  const [user, setUser] = useState<UserData>();
  const [followed, setFollowed] = useState(false);
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    //get token and user id
    const token = localStorage.getItem('jwt_token');
    const currentUserId = localStorage.getItem('userId');

    //fetch user data
    axios
      .get(`${apiUrl}/users/${image.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        //check whether the current user followed a certain user
        if (
          res.data.user.followers.find(el => el.followingId === +currentUserId)
        ) {
          setFollowed(true);
        }

        //update user state
        setUser(res.data.user);
      })
      .catch(err => {
        //handle errors
        handleErrors(err, history, 'Failed to follow! Please try again!');
      });
  }, [image, history]);

  //for toggling the follow btn
  const toggleFollowBtn = (id: number) => {
    //get token
    const token = localStorage.getItem('jwt_token');

    //make post request to api
    axios
      .post(
        `${apiUrl}/users/${image.userId}/toggleFollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        //check whether followed or unfollow
        if (res.data.message === 'Followed successfully.') {
          setFollowed(true);
        }

        if (res.data.message === 'Unfollowed successfully.') {
          setFollowed(false);
        }
      })
      .catch(err => {
        //handle errors
        handleErrors(err, history, "Failed to fetch user's data!");
      });
  };

  return (
    <div className={classes.userContainer}>
      <div className={classes.profileImageContainer}>
        {user && <img src={user.profileImage} alt={`${image.userId}`} />}
      </div>
      <div className={classes.userInfoContainer}>
        {user && (
          <Link to={`/user/${user.id}`} className={classes.userLink}>
            {user.name}
          </Link>
        )}
      </div>
      <div className={classes.followContainer}>
        {+currentUserId !== image.userId && (
          <FollowBtn
            toggleFollow={() => toggleFollowBtn(image.userId)}
            followed={followed}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoSection;
