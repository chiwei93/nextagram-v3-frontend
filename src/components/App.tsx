import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import PageContainer from '../containers/PageContainer';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MyProfilePage from '../pages/MyProfilePage';
import ErrorPage from '../pages/ErrorPage';
import SinglePhotoPage from '../pages/SinglePhotoPage';
import DeletePhotoPage from '../pages/DeletePhotoPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import SearchPage from '../pages/SearchPage';
import AboutPage from '../pages/AboutPage';
import TermPage from '../pages/TermPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageContainer>
        <Navigation />
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/me" component={MyProfilePage} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/terms" component={TermPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/search/:searchTerm" component={SearchPage} />
          <Route path="/user/:userId" component={UserPage} />
          <Route path="/photo/delete/:photoId" component={DeletePhotoPage} />
          <Route path="/photo/:photoId" component={SinglePhotoPage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
        <Footer />
        <ToastContainer />
      </PageContainer>
    </BrowserRouter>
  );
};

export default App;
