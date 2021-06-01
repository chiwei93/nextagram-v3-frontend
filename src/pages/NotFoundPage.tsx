import ServerError from '../components/Error/ServerError';
import ContentPageContainer from '../containers/ContentPageContainer';

const NotFoundPage: React.FC = () => {
  return (
    <ContentPageContainer>
      <ServerError errorMsg="Page not Found! (404) Please click the button to return to the home page. Sorry for the incovenience caused!" />
    </ContentPageContainer>
  );
};

export default NotFoundPage;
