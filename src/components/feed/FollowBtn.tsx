import classes from './FollowBtn.module.css';

interface PropsType {
  toggleFollow: () => void;
  followed: boolean;
}

const FollowBtn: React.FC<PropsType> = ({ toggleFollow, followed }) => {
  //determine whether the current user follow the specific user
  const active = followed ? classes.followed : null;

  return (
    <button className={`${classes.btn} ${active}`} onClick={toggleFollow}>
      Follow
    </button>
  );
};

export default FollowBtn;
