import { OverlayProps } from '../../types';
import classes from './Overlay.module.css';

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
  return (
    <div className={classes.overlay} onClick={onClose}>
      {children}
    </div>
  );
};

export default Overlay;
