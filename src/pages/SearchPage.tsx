import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import SearchBar from '../components/feed/SearchBar';
import ContentPageContainer from '../containers/ContentPageContainer';
import { apiUrl } from '../util/api';
import classes from './SearchPage.module.css';
import { ImageData } from '../types';
import PageLoader from '../components/loaders/PageLoader';
import Image from '../components/profile/Image';
import handleErrors from '../util/handleErrors';

const SearchPage: React.FC = () => {
  const history = useHistory();

  //get params
  const { searchTerm } = useParams<{ searchTerm: string }>();

  //set the initial state
  const [images, setImages] = useState<ImageData[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    //check for login
    if (!token) {
      return history.push('/login');
    }

    //start loading
    setIsPageLoading(true);

    //get token

    //fetch data
    axios
      .get(`${apiUrl}/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          tag: `#${searchTerm}`,
        },
      })
      .then(res => {
        //update the images
        setImages(res.data.images);

        //stop loading
        setIsPageLoading(false);
      })
      .catch(err => {
        //stop loading
        setIsPageLoading(false);

        //handle errors
        handleErrors(err, history, 'An error occurred while fetching data');

        //navigate users to error page if internal server error
        if (err.response.status !== (400 || 401 || 403 || 404)) {
          history.push('/error');
        }
      });
  }, [searchTerm, history]);

  //if page is loading
  if (isPageLoading) {
    return <PageLoader />;
  }

  return (
    <ContentPageContainer>
      <SearchBar />
      <h2 className={classes.heading}>Search For: {`#${searchTerm}`}</h2>

      <div className={classes.imagesContainer}>
        {images.map(image => {
          return (
            <Image isCurrentUserImages={false} image={image} key={image.id} />
          );
        })}
      </div>
      {images.length === 0 && (
        <p className={classes.text}>
          No images for the search tag. Please try another one!
        </p>
      )}
    </ContentPageContainer>
  );
};

export default SearchPage;
