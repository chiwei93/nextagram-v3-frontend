import axios from 'axios';
import { useState, useEffect, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';

import UserInfoSection from './UserInfoSection';
import CommentSection from './CommentSection';
import classes from './SingleImageCard.module.css';
import { CommentData, ImageData } from '../../types';
import { apiUrl } from '../../util/api';
import handleErrors from '../../util/handleErrors';

interface PropsType {
  image: ImageData;
}

const SingleImageCard = forwardRef<any, PropsType>(({ image }, ref) => {
  const history = useHistory();

  //set states
  const [comments, setComments] = useState<CommentData[]>([]);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    //get token
    const token = localStorage.getItem('jwt_token');

    //fetch comments for the image
    axios
      .get(`${apiUrl}/comments/image/${image.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        //update states
        setTotalComments(res.data.comments.length);
        setComments(res.data.comments.slice(-2));
      })
      .catch(err => {
        //handle errors
        handleErrors(
          err,
          history,
          'An error occurred while fetching comments!'
        );
      });
  }, [image, history]);

  //for handling adding comment
  const addComment = (comment: string) => {
    //get token
    const token = localStorage.getItem('jwt_token');

    //make post request to api
    axios
      .post(
        `${apiUrl}/comments/image/${image.id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        //update state
        setComments(prevState => [...prevState, res.data.comment]);
        setTotalComments(prevState => prevState + 1);
      })
      .catch(err => {
        //handle errors
        handleErrors(err, history, 'Failed to add comment!');
      });
  };

  return (
    <div className={classes.card} key={image.id} ref={ref}>
      <UserInfoSection image={image} />
      <div className={classes.imageContainer}>
        <img src={image.imageUrl} alt="live" />
      </div>
      <div className={classes.commentContainer}>
        <CommentSection
          image={image}
          comments={comments}
          addComment={addComment}
          isHome={true}
          totalComments={totalComments}
        />
      </div>
    </div>
  );
});

export default SingleImageCard;
