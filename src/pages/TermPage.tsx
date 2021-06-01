import ContentPageContainer from '../containers/ContentPageContainer';
import FooterPageContainer from '../containers/FooterPageContainer';

const TermPage: React.FC = () => {
  return (
    <ContentPageContainer>
      <FooterPageContainer
        title="Privacy and Terms"
        phrase="Please find the terms of Nextagram below:"
      />
    </ContentPageContainer>
  );
};

export default TermPage;
