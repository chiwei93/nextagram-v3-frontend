import { Link } from 'react-router-dom';

import classes from './Image.module.css';
import { ImageData } from '../../types';

interface PropsType {
  image: ImageData;
  isCurrentUserImages: boolean;
}

const Image: React.FC<PropsType> = ({ image, isCurrentUserImages }) => {
  return (
    <div className={classes.imageContainer}>
      <img src={image.imageUrl} alt={`${image.id}`} />

      <div className={classes.overlay}>
        <Link
          to={`/photo/${image.id}`}
          className={`${classes.btn} ${classes.marRight}`}
        >
          View Photo
        </Link>

        {isCurrentUserImages && (
          <Link to={`/photo/delete/${image.id}`} className={`${classes.btn}`}>
            Delete Photo
          </Link>
        )}
      </div>
    </div>
  );
};

export default Image;
