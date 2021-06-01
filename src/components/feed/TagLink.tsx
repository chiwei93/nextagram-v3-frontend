import { Link } from 'react-router-dom';

import classes from './TagLink.module.css';

interface PropsType {
  tag: { tag: string };
}

const TagLink: React.FC<PropsType> = ({ tag }) => {
  const url = tag.tag.replace('#', '');

  return (
    <li className={classes.item}>
      <Link to={`/search/${url}`} className={classes.link}>
        {tag.tag.includes('#') ? tag.tag : `#${tag.tag}`}
      </Link>
    </li>
  );
};

export default TagLink;
