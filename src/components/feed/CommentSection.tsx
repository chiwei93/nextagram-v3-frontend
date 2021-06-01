import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import UserLink from '../feed/UserLink';
import SingleComment from '../feed/SingleComment';
import LikeBtn from '../feed/LikeBtn';
import classes from './CommentSection.module.css';
import TagLink from './TagLink';
import { CommentData, ImageData } from '../../types';
import { apiUrl } from '../../util/api';
import handleErrors from '../../util/handleErrors';

interface PropsType {
  image: ImageData;
  comments: CommentData[];
  addComment: (comment: string) => void;
  isHome: boolean;
  totalComments?: number;
}

const CommentSection: React.FC<PropsType> = ({
  comments,
  image,
  addComment,
  isHome,
  totalComments,
}) => {
  const history = useHistory();

  //set state
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState<number>(image.imageLikes.length);

  useEffect(() => {
    //scroll to the bottom of the comment list when the comments change
    document
      .getElementById('comment_nav')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  useEffect(() => {
    const likesArr = image.imageLikes || [];

    const currentUserId = localStorage.getItem('userId');

    if (likesArr.length !== 0) {
      //check if the current user id is found in the likes arr
      if (likesArr.find(like => like.userId === +currentUserId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } else {
      setIsLiked(false);
    }
  }, [image]);

  //for handling new comment submission
  const onCommentSubmit = () => {
    //check if comment is empty
    if (comment.length === 0) {
      //prevent submission
      return;
    }

    addComment(comment);

    setComment('');
  };

  //for toggling like
  const imageToggleLike = (id: string | number) => {
    //get token
    const token = localStorage.getItem('jwt_token');

    let url = `${apiUrl}/images/${id}/toggleLike`;

    //make post request to api
    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        //liked the image
        if (res.data.message === 'Image liked successfully') {
          setIsLiked(true);
          setNumLikes(prevState => prevState + 1);
        }

        //unliked the image
        if (res.data.message === 'Image unliked successfully') {
          setIsLiked(false);
          setNumLikes(prevState => prevState - 1);
        }
      })
      .catch(err => {
        //handle errors
        handleErrors(
          err,
          history,
          'Image like toggling failed! Please try again!'
        );
      });
  };

  return (
    <div className={classes.commentsSection}>
      <div className={classes.controls}>
        <LikeBtn
          toggleLike={() => imageToggleLike(image.id)}
          isLiked={isLiked}
        />

        <p>
          {numLikes} <span className={classes.likes}>Likes</span>
        </p>
      </div>

      {image.caption && (
        <div className={classes.userCaption}>
          <UserLink image={image} />
          <span>{image.caption}</span>
        </div>
      )}

      {image.tags.length > 0 && (
        <ul className={classes.tagsList}>
          {image.tags.map((tag, index) => (
            <TagLink key={index} tag={tag} />
          ))}
        </ul>
      )}

      {isHome && totalComments > 2 && (
        <Link to={`/photo/${image.id}`} className={classes.btnViewMore}>
          {`View all comments (${totalComments})`}
        </Link>
      )}

      {!isHome && (
        <div
          className={classes.commentsHeading}
        >{`Comments (${comments.length})`}</div>
      )}

      {!isHome && (
        <ul className={classes.commentList}>
          {comments.map(comment => (
            <SingleComment key={comment.id} comment={comment} />
          ))}
          <div id="comment_nav"></div>
        </ul>
      )}

      {isHome && (
        <ul className={classes.homeCommentList}>
          {comments.map(comment => (
            <SingleComment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}

      <div className={classes.addPost}>
        <input
          type="text"
          placeholder="Add comment here"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <div className={classes.btnPost}>
          <button
            disabled={comment.length === 0 ? true : false}
            onClick={onCommentSubmit}
            className={comment.length === 0 ? classes.disabled : null}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
