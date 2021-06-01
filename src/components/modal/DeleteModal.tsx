import { FaTimes } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import classes from './DeleteModal.module.css';
import Overlay from './Overlay';

interface PropsType {
  onDelete: () => void;
}

const DeleteModal: React.FC<PropsType> = ({ onDelete }) => {
  const history = useHistory();

  return ReactDOM.createPortal(
    <Overlay onClose={() => history.goBack()}>
      <div className={classes.modal} onClick={e => e.stopPropagation()}>
        <button onClick={() => history.goBack()} className={classes.btnClose}>
          <FaTimes />
        </button>

        <div className={classes.message}>
          Are you sure you want to delete this photo?
        </div>

        <div className={classes.btnContainer}>
          <button
            className={`${classes.btn} ${classes.marRight}`}
            onClick={onDelete}
          >
            Confirm
          </button>
          <button className={classes.btn} onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </div>
    </Overlay>,
    document.getElementById('modal')
  );
};

export default DeleteModal;
