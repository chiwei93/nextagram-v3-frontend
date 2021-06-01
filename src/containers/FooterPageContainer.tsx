import classes from './FooterPageContainer.module.css';

interface PropsType {
  title: string;
  phrase: string;
}

const FooterPageContainer: React.FC<PropsType> = ({ title, phrase }) => {
  return (
    <div className={classes.container}>
      <h2>{title}</h2>

      <h4>{phrase}</h4>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus sem
        et malesuada egestas. Etiam sed aliquet neque. Integer volutpat ante in
        faucibus egestas. Proin vehicula lobortis elit, eget malesuada massa
        rhoncus nec. Suspendisse quis accumsan erat. Curabitur rhoncus, magna
        eget vehicula dictum, turpis dui porttitor dui, nec auctor lectus velit
        eget purus. Aliquam pharetra orci ut laoreet rhoncus. Nulla sollicitudin
        fermentum ante, non pellentesque neque eleifend eu. Etiam dignissim
        pellentesque neque at sodales. Nulla tempus pretium pretium. Nam
        aliquet, massa at viverra aliquet, enim odio rutrum nibh, eget sagittis
        magna magna eu enim. Curabitur tincidunt, turpis ut malesuada aliquam,
        sapien magna cursus dui, a convallis lorem mi sed enim. Integer
        tincidunt id mi eu sodales. Suspendisse potenti. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </p>

      <p>
        Donec interdum blandit augue, vel mollis massa vulputate vel. Donec
        dictum interdum dolor. Nunc eu faucibus lorem, a varius urna. Nullam
        pulvinar, magna in consequat faucibus, mi massa congue justo, quis
        mollis leo ipsum sed ipsum. Morbi at lacus purus. Phasellus ut ornare
        justo. Cras fermentum ligula a efficitur sodales. Morbi tempor pretium
        pharetra. Vestibulum porttitor magna nec turpis dapibus, nec porta augue
        facilisis. In nec orci malesuada arcu ornare bibendum. Cras a tellus
        tempor, aliquam ipsum in, iaculis felis. In fermentum enim ac magna
        fermentum, et gravida nibh varius.
      </p>

      <p>
        Sed eget tincidunt nisl. Cras fermentum, libero dapibus iaculis
        consequat, ipsum odio maximus mi, eu imperdiet magna erat sed enim. Ut
        non malesuada nisi. Praesent non maximus odio. Curabitur efficitur porta
        rutrum. Pellentesque posuere mollis purus, eu laoreet mauris vestibulum
        eu. Suspendisse a vehicula nibh. Praesent blandit luctus molestie. Sed
        varius odio non lacus tincidunt elementum. Nunc nisi ante, mollis in
        feugiat sed, gravida vitae magna. Sed vulputate lacus a nisl vulputate
        consectetur.
      </p>
    </div>
  );
};

export default FooterPageContainer;
