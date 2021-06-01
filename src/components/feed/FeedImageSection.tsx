import { forwardRef } from 'react';
import classes from './FeedImageSection.module.css';
import { ImageData } from '../../types';
import SingleImageCard from './SingleImageCard';
import PageLoader from '../loaders/PageLoader';

interface PropsType {
  images: ImageData[];
  isLoading: boolean;
}

const FeedImageSection = forwardRef<any, PropsType>(
  ({ images, isLoading }, ref) => {
    return (
      <div className={classes.container}>
        {images.map((image, index) => {
          //if it is the last
          if (index === images.length - 1) {
            return <SingleImageCard key={index} image={image} ref={ref} />;
          } else {
            //if its not the last
            return <SingleImageCard key={index} image={image} />;
          }
        })}
        {isLoading && (
          <div className={classes.loaderContainer}>
            <PageLoader />
          </div>
        )}
      </div>
    );
  }
);

export default FeedImageSection;
