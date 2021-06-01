import { FaRegHeart, FaHeart } from 'react-icons/fa';

import classes from './LikeBtn.module.css';

interface PropsType {
  toggleLike: () => void;
  isLiked: boolean;
}

const LikeBtn: React.FC<PropsType> = ({ toggleLike, isLiked }) => {
  //if liked
  if (isLiked) {
    return (
      <button
        className={`${classes.btn} ${classes.liked}`}
        onClick={toggleLike}
      >
        <FaHeart />
      </button>
    );
  }

  //if unliked
  return (
    <button className={classes.btn} onClick={toggleLike}>
      <FaRegHeart />
    </button>
  );
};

export default LikeBtn;
