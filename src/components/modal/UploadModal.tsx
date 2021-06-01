import ReactDOM from 'react-dom';
import { ModalProps } from '../../types';
import Modal from './Modal';
import Overlay from './Overlay';

const UploadModal: React.FC<ModalProps> = ({
  onClose,
  isProfileModal,
  onUploadPhoto,
  isUploading,
}) => {
  return ReactDOM.createPortal(
    <Overlay onClose={onClose}>
      <Modal
        onClose={onClose}
        isProfileModal={isProfileModal}
        onUploadPhoto={onUploadPhoto}
        isUploading={isUploading}
      />
    </Overlay>,
    document.getElementById('modal')
  );
};

export default UploadModal;
