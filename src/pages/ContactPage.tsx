import ContentPageContainer from '../containers/ContentPageContainer';
import FooterPageContainer from '../containers/FooterPageContainer';

const ContactPage: React.FC = () => {
  return (
    <ContentPageContainer>
      <FooterPageContainer
        title="Contact Us"
        phrase="Contact us through the means listed below:"
      />
    </ContentPageContainer>
  );
};

export default ContactPage;
