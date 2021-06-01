import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import UserLink from './UserLink';
import classes from './SingleComment.module.css';
import LikeBtn from './LikeBtn';
import { CommentData } from '../../types';
import { apiUrl } from '../../util/api';
import handleErrors from '../../util/handleErrors';

interface PropsType {
  comment: CommentData;
}

const SingleComment: React.FC<PropsType> = ({ comment }) => {
  const history = useHistory();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    //check if the current user had liked the comment already
    const likesArr = comment.commentLikes || [];

    //get current user id
    const currentUserId = localStorage.getItem('userId');

    if (likesArr.length !== 0) {
      if (likesArr.find(like => like.userId === +currentUserId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } else {
      setIsLiked(false);
    }
  }, [comment]);

  //for toggling like on comment
  const commentToggleLike = (id: string | number) => {
    //get token
    const token = localStorage.getItem('jwt_token');

    //make post request to api
    axios
      .post(
        `${apiUrl}/comments/${id}/toggleLike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        //toggle like
        if (res.data.message === 'Comment liked successfully.') {
          setIsLiked(true);
        }

        if (res.data.message === 'Comment unliked successfully.') {
          setIsLiked(false);
        }
      })
      .catch(err => {
        //handle errors
        handleErrors(
          err,
          history,
          'Comment like toggling failed! Please try again!'
        );
      });
  };

  return (
    <li className={classes.commentItem}>
      <div className={classes.link}>
        <UserLink comment={comment} />
      </div>

      <div className={classes.comment}>{comment.comment}</div>

      <div className={classes.like}>
        <LikeBtn
          toggleLike={() => commentToggleLike(comment.id)}
          isLiked={isLiked}
        />
      </div>
    </li>
  );
};

export default SingleComment;
