import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useDisableBodyScroll from '../components/hooks/useDisableBodyScroll';
import UploadModal from '../components/modal/UploadModal';
import Header from '../components/profile/Header';
import ImageSection from '../components/profile/ImageSection';
import ContentPageContainer from '../containers/ContentPageContainer';
import { apiUrl } from '../util/api';
import { ImageData, UserData } from '../types';
import PageLoader from '../components/loaders/PageLoader';
import toastify from '../util/toast';
import handleErrors from '../util/handleErrors';

const MyProfilePage: React.FC = () => {
  const history = useHistory();

  const tokenRef = useRef('');

  //set states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [user, setUser] = useState<UserData>();
  const [images, setImages] = useState<ImageData[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  //hook for disabling page scrolling while modal is open
  useDisableBodyScroll(showProfileModal, showUploadModal);

  useEffect(() => {
    //get token
    const token = localStorage.getItem('jwt_token');
    tokenRef.current = token;

    //navigate user back to the login page if they are not authenticatd
    if (!token) {
      return history.push('/login');
    }

    //fetch data
    Promise.all([
      axios.get(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${apiUrl}/images/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
      .then(res => {
        const dataArr = res.map(el => el.data);

        //set states
        setProfileImage(dataArr[0].user.profileImage);
        setUser(dataArr[0].user);
        setImages(dataArr[1].images);

        //stop loading
        setIsPageLoading(false);
      })
      .catch(err => {
        //stop page loading
        setIsPageLoading(false);

        //handle errors
        handleErrors(err, history, 'An error occurred while fetching data!');

        //for internal server errors
        if (err.response.status !== 401) {
          history.push('/error');
        }
      });
  }, [history]);

  //for uploading photo
  const onUploadPhoto = (formData: FormData, isProfileModal: boolean) => {
    //set uploading state
    setIsUploading(true);

    //determine url to use
    let url: string;

    if (isProfileModal) {
      url = `${apiUrl}/users/profileImage`;
    } else {
      url = `${apiUrl}/images`;
    }

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${tokenRef.current}`,
        },
      })
      .then(res => {
        //update uploading status
        setIsUploading(false);

        if (isProfileModal) {
          //set profile image and close the modal
          setProfileImage(res.data.user.profileImage);
          setShowProfileModal(false);
        } else {
          //update the list of images and close the modal
          setImages(prevState => [res.data.image, ...prevState]);
          setShowUploadModal(false);
        }

        //notify user of successful upload
        toastify(true, 'Image uploaded successfully!');
      })
      .catch(err => {
        //update the uploading state
        setIsUploading(false);

        //handle errors
        handleErrors(err, history, 'Uploading photo failed! Please try again!');
      });
  };

  //if page is loading, return the loader
  if (isPageLoading) {
    return (
      <ContentPageContainer>
        <PageLoader />
      </ContentPageContainer>
    );
  }

  return (
    <ContentPageContainer>
      <Header
        openProfileModal={() => setShowProfileModal(true)}
        openUploadModal={() => setShowUploadModal(true)}
        profileImage={profileImage}
        user={user}
        isCurrentUserPage={true}
      />
      <ImageSection images={images} isCurrentUserImages={true} />
      {showProfileModal && (
        <UploadModal
          onClose={() => setShowProfileModal(false)}
          isProfileModal={true}
          onUploadPhoto={onUploadPhoto}
          isUploading={isUploading}
        />
      )}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          isProfileModal={false}
          onUploadPhoto={onUploadPhoto}
          isUploading={isUploading}
        />
      )}
    </ContentPageContainer>
  );
};

export default MyProfilePage;
