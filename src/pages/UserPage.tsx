import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PageLoader from '../components/loaders/PageLoader';
import Header from '../components/profile/Header';
import ImageSection from '../components/profile/ImageSection';
import ContentPageContainer from '../containers/ContentPageContainer';
import { ImageData, UserData } from '../types';
import { apiUrl } from '../util/api';
import handleErrors from '../util/handleErrors';

const UserPage: React.FC = () => {
  const history = useHistory();

  //get params
  const { userId } = useParams<{ userId: string }>();

  //set initial state
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState<UserData>();
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    //get token
    const token = localStorage.getItem('jwt_token');
    const currentUserId = localStorage.getItem('userId');

    //check login status
    if (!token) {
      return history.push('/login');
    }

    //fetch user and image data
    Promise.all([
      axios.get(`${apiUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${apiUrl}/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId,
        },
      }),
    ])
      .then(res => {
        const dataArr = res.map(el => el.data);

        //check if the current user follow the specific user
        if (
          dataArr[0].user.followers.find(
            following => following.followingId === +currentUserId
          )
        ) {
          setFollowed(true);
        }

        //update state
        setUser(dataArr[0].user);
        setImages(dataArr[1].images);

        //stop loading
        setIsPageLoading(false);
      })
      .catch(err => {
        //stop loading
        setIsPageLoading(false);

        //handle errors
        handleErrors(err, history, 'An error occurred while fetching data!');

        //navigate user to error page if the user cannot be found or internal server error
        if (err.response.status !== (400 || 401 || 403)) {
          history.push('/error');
        }
      });
  }, [history, userId]);

  //function for toggling follow
  const toggleFollow = (userId: string) => {
    const token = localStorage.getItem('jwt_token');

    axios
      .post(
        `${apiUrl}/users/${userId}/toggleFollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        //follow
        if (res.data.message === 'Followed successfully.') {
          setFollowed(true);
        }

        //unfollow
        if (res.data.message === 'Unfollowed successfully.') {
          setFollowed(false);
        }
      })
      .catch(err => {
        //handle errors
        handleErrors(err, history, 'Follow toggling failed! Please try again!');
      });
  };

  //if page is loading
  if (isPageLoading) {
    return <PageLoader />;
  }

  return (
    <ContentPageContainer>
      <Header
        user={user}
        isCurrentUserPage={false}
        profileImage={user.profileImage}
        isFollowed={followed}
        toggleFollow={() => toggleFollow(userId)}
      />
      <ImageSection images={images} isCurrentUserImages={false} />
    </ContentPageContainer>
  );
};

export default UserPage;
