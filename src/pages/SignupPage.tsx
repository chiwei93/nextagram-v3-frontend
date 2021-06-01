import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import ContentPageContainer from '../containers/ContentPageContainer';
import Header from '../components/auth/Header';
import Form from '../components/auth/Form';
import image from '../images/signup.png';
import { SignupData } from '../types';
import { apiUrl } from '../util/api';
import useGlobalContext from '../store';
import toastify from '../util/toast';
import handleErrors from '../util/handleErrors';

const SignupPage: React.FC = () => {
  const history = useHistory();

  const { isLogin } = useGlobalContext();
  const [inProgress, setInProgress] = useState(false);

  //check login status
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    //navigate user to their profile page if they try to manually navigate to this page when they're logged in
    if (token) {
      history.push('/me');
    }
  }, [isLogin, history]);

  //handling signing up
  const onSignup = (signupData: SignupData) => {
    //start signup progress
    setInProgress(true);

    //make post request to api
    axios
      .post(`${apiUrl}/auth/signup`, signupData)
      .then(res => {
        //stop signup progress
        setInProgress(false);

        //notify user
        toastify(true, 'Signed up successfully!');

        //navigate the login page
        history.push('/login');
      })
      .catch(err => {
        //stop signup progress
        setInProgress(false);

        //error handling
        handleErrors(err, history, 'Signing up failed! Please try again!');
      });
  };

  return (
    <ContentPageContainer>
      <Header
        image={image}
        heading="Register here to start sharing with people around the world"
      />
      <Form isLogin={false} onSignup={onSignup} inProgress={inProgress} />
    </ContentPageContainer>
  );
};

export default SignupPage;
