import Hero from '../components/layout/Hero';
import ContentPageContainer from '../containers/ContentPageContainer';

const IndexPage: React.FC = () => {
  return (
    <ContentPageContainer>
      <Hero />
    </ContentPageContainer>
  );
};

export default IndexPage;
