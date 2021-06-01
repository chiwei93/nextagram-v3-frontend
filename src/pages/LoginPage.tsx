import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import ContentPageContainer from '../containers/ContentPageContainer';
import Header from '../components/auth/Header';
import Form from '../components/auth/Form';
import { LoginData } from '../types';
import image from '../images/login.png';
import { apiUrl } from '../util/api';
import useGlobalContext from '../store';
import toastify from '../util/toast';
import handleErrors from '../util/handleErrors';

const LoginPage: React.FC = () => {
  const history = useHistory();

  const { isLogin, loggedIn } = useGlobalContext();
  const [inProgress, setInProgress] = useState(false);

  //check login status
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    //navigate user to their profile page if they manually navigate to the login page if they are logged in
    if (token) {
      history.push('/me');
    }
  }, [isLogin, history]);

  //handling login process
  const onLogin = (loginData: LoginData) => {
    //start login
    setInProgress(true);

    axios
      .post(`${apiUrl}/auth/login`, loginData)
      .then(res => {
        //stop login
        setInProgress(false);

        //save the token and userId to the local storage
        localStorage.setItem('jwt_token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);

        // notify user
        toastify(true, 'Logged in successfully!');

        //logged the user in
        loggedIn();

        //navigate to their profile page
        history.push('/me');
      })
      .catch(err => {
        //stop login
        setInProgress(false);

        //handle errors
        handleErrors(err, history, 'Logging in failed! Please try again!');
      });
  };

  return (
    <ContentPageContainer>
      <Header image={image} heading="Sign In to to start sharing now" />
      <Form isLogin={true} onLogin={onLogin} inProgress={inProgress} />
    </ContentPageContainer>
  );
};

export default LoginPage;
