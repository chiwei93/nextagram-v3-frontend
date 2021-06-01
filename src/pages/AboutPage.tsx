import ContentPageContainer from '../containers/ContentPageContainer';
import FooterPageContainer from '../containers/FooterPageContainer';

const AboutPage: React.FC = () => {
  return (
    <ContentPageContainer>
      <FooterPageContainer
        title="About Us"
        phrase="Nextagram is a photo sharing application"
      />
    </ContentPageContainer>
  );
};

export default AboutPage;
