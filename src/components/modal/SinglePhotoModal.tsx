import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Overlay from './Overlay';
import classes from './SinglePhotoModal.module.css';

import CommentSection from '../feed/CommentSection';
import { CommentData, ImageData } from '../../types';

interface PropsType {
  image: ImageData;
  comments: CommentData[];
  addComment: (comment: string) => void;
}

const SinglePhotoModal: React.FC<PropsType> = ({
  image,
  comments,
  addComment,
}) => {
  const history = useHistory();

  return ReactDOM.createPortal(
    <Overlay onClose={() => history.goBack()}>
      <div className={classes.modal} onClick={e => e.stopPropagation()}>
        <div className={classes.imageSection}>
          <button className={classes.btnClose} onClick={() => history.goBack()}>
            <FaTimes />
          </button>
          <div className={classes.imagePreview}>
            {image && <img src={image.imageUrl} alt={`${image.id}`} />}
          </div>
        </div>

        <div className={classes.commentsFeed}>
          <CommentSection
            comments={comments}
            image={image}
            addComment={addComment}
            isHome={false}
          />
        </div>
      </div>
    </Overlay>,
    document.getElementById('modal')
  );
};

export default SinglePhotoModal;
