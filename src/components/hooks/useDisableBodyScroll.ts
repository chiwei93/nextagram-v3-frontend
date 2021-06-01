import { useEffect } from 'react';

const useDisableBodyScroll = (profileModal: boolean, uploadModal: boolean) => {
  useEffect(() => {
    //check if the modals are shown, disable the scrolling in the background
    if (profileModal || uploadModal) {
      document.body.style.overflow = 'hidden';
    } else {
      //enable scrolling when the modal is closed
      document.body.style.overflow = 'unset';
    }
  }, [profileModal, uploadModal]);
};

export default useDisableBodyScroll;
