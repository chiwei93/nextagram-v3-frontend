import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

import DeleteModal from '../components/modal/DeleteModal';
import ContentPageContainer from '../containers/ContentPageContainer';
import { apiUrl } from '../util/api';
import handleErrors from '../util/handleErrors';
import toastify from '../util/toast';

const DeletePhotoPage = () => {
  const history = useHistory();

  useEffect(() => {
    //check login status
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      return history.push('/login');
    }
  }, [history]);

  const { photoId } = useParams<{ photoId: string }>();

  //handling deleting photo
  const deletePhoto = () => {
    //get token
    const token = localStorage.getItem('jwt_token');

    axios
      .delete(`${apiUrl}/images/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        //go back to the previous page
        history.goBack();

        //notify user
        toastify(true, 'The image was deleted successfully!');
      })
      .catch(err => {
        //handle errors
        handleErrors(err, history, 'Deleting image failed! Please try again!');
      });
  };

  return (
    <ContentPageContainer>
      <DeleteModal onDelete={deletePhoto} />
    </ContentPageContainer>
  );
};

export default DeletePhotoPage;
