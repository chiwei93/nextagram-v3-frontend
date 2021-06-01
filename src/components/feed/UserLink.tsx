import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { CommentData, ImageData, UserData } from '../../types';
import classes from './UserLink.module.css';
import { apiUrl } from '../../util/api';
import toastify from '../../util/toast';

interface PropsType {
  image?: ImageData;
  comment?: CommentData;
}

const UserLink: React.FC<PropsType> = ({ image, comment }) => {
  const userId = image?.userId || comment?.userId;

  //set initial state
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    //get token
    const token = localStorage.getItem('jwt_token');

    //fetch user's data
    axios
      .get(`${apiUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        //update user's state
        setUser(res.data.user);
      })
      .catch(err => {
        toastify(false, 'An error occurred while fetching data');
      });
  }, [userId]);

  //return null if user is undefined
  if (!user) {
    return null;
  }

  return (
    <Link to={`/user/${user.id}`} className={classes.userLink}>
      {user.name}
    </Link>
  );
};

export default UserLink;
