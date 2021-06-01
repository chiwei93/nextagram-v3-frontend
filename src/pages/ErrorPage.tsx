import ServerError from '../components/Error/ServerError';
import ContentPageContainer from '../containers/ContentPageContainer';

const ErrorPage: React.FC = () => {
  return (
    <ContentPageContainer>
      <ServerError errorMsg="An error had occurred! Press the button below to go back to the home page. Sorry for the incovenience caused." />
    </ContentPageContainer>
  );
};

export default ErrorPage;
