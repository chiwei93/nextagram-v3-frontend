import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PageLoader from '../components/loaders/PageLoader';
import SinglePhotoModal from '../components/modal/SinglePhotoModal';
import ContentPageContainer from '../containers/ContentPageContainer';
import useGlobalContext from '../store';
import { CommentData, ImageData } from '../types';
import { apiUrl } from '../util/api';
import handleErrors from '../util/handleErrors';

interface ParamType {
  photoId: string;
}

const SinglePhotoPage: React.FC = () => {
  const history = useHistory();

  const { checkIsLogin, isLogin } = useGlobalContext();

  const { photoId } = useParams<ParamType>();

  //set state
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [image, setImage] = useState<ImageData>();

  useEffect(() => {
    //get token
    const token = localStorage.getItem('jwt_token');

    //check login status
    if (!token) {
      return history.push('/login');
    }

    //fetch data
    Promise.all([
      axios.get(`${apiUrl}/images/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${apiUrl}/comments/image/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
      .then(res => {
        const dataArr = res.map(el => el.data);

        //set image and comments
        setImage(dataArr[0].image);
        setComments(dataArr[1].comments);

        //stop loading
        setIsPageLoading(false);
      })
      .catch(err => {
        //stop loading
        setIsPageLoading(false);

        //handle errors
        handleErrors(
          err,
          history,
          'An error occurred while fetching image data!'
        );

        //navigate user to error page
        if (err.response.status !== 401) {
          history.push('/error');
        }
      });
  }, [history, photoId, checkIsLogin, isLogin]);

  //handling adding comment process
  const addComment = (comment: string) => {
    //get token
    const token = localStorage.getItem('jwt_token');

    axios
      .post(
        `${apiUrl}/comments/image/${photoId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        //set new comments
        setComments(prevState => [...prevState, res.data.comment]);
      })
      .catch(err => {
        //handle errors
        handleErrors(err, history, 'Failed to add comment! Please try again!');
      });
  };

  //if the page is loading
  if (isPageLoading) {
    return <PageLoader />;
  }

  return (
    <ContentPageContainer>
      <SinglePhotoModal
        image={image}
        comments={comments}
        addComment={addComment}
      />
    </ContentPageContainer>
  );
};

export default SinglePhotoPage;
