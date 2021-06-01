import Image from './Image';
import { ImageData } from '../../types';
import classes from './ImageSection.module.css';

interface PropsType {
  images: ImageData[];
  isCurrentUserImages: boolean;
}

const ImageSection: React.FC<PropsType> = ({ images, isCurrentUserImages }) => {
  return (
    <div className={classes.container}>
      {images.length > 0 && <h3>Images</h3>}

      {images.length > 0 && (
        <div className={classes.imagesContainer}>
          {images.map(image => {
            return (
              <Image
                key={image.id}
                image={image}
                isCurrentUserImages={isCurrentUserImages}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageSection;
