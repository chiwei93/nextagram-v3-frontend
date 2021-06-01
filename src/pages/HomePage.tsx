import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import FeedImageSection from '../components/feed/FeedImageSection';
import FeedProfileSection from '../components/feed/FeedProfileSection';
import SearchBar from '../components/feed/SearchBar';

import ContentPageContainer from '../containers/ContentPageContainer';
import FeedPageContainer from '../containers/FeedPageContainer';
import { UserData } from '../types';
import { apiUrl } from '../util/api';
import useFetchImages from '../components/hooks/useFetchImages';
import handleErrors from '../util/handleErrors';

const HomePage: React.FC = () => {
  const history = useHistory();

  const observer = useRef<IntersectionObserver>();

  //set states
  const [user, setUser] = useState<UserData>();
  const [pageNumber, setPageNumber] = useState(1);

  //use the custom hook
  const { isImagesLoading, images, totalImages, hasError } =
    useFetchImages(pageNumber);

  //determine whether the api has more images
  const hasMore = totalImages > images.length;

  useEffect(() => {
    //get token
    const token = localStorage.getItem('jwt_token');

    //check if login
    if (!token) {
      return history.push('/login');
    }

    //fetch the user data
    axios
      .get(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        //update user state
        setUser(res.data.user);
      })
      .catch(err => {
        //handler errors
        handleErrors(
          err,
          history,
          "An error occurred while fetching user's data!"
        );
      });
  }, [history]);

  //when the last element intercepts the screen
  const lastElementRef = useCallback<(node: any) => void>(
    node => {
      //check if its is loading
      if (isImagesLoading) return;

      //disconnect any previous observer
      if (observer.current) observer.current.disconnect();

      //create a new observer
      observer.current = new IntersectionObserver(entries => {
        //if the last element is intercepting the screen and there are more images
        if (entries[0].isIntersecting && hasMore) {
          //increase the page number
          setPageNumber(prevState => prevState + 1);
        }
      });

      //observe the last element
      if (node) observer.current.observe(node);
    },
    [isImagesLoading, hasMore]
  );

  //if an error occurred while fetching image data
  if (hasError) {
    history.push('/error');
    return null;
  }

  return (
    <ContentPageContainer>
      <SearchBar />
      <FeedPageContainer>
        <FeedImageSection
          images={images}
          ref={lastElementRef}
          isLoading={isImagesLoading}
        />
        <FeedProfileSection user={user} />
      </FeedPageContainer>
    </ContentPageContainer>
  );
};

export default HomePage;
