import React, { ChangeEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import classes from './Modal.module.css';
import { ModalProps } from '../../types';

const Modal: React.FC<ModalProps> = ({
  onClose,
  isProfileModal,
  onUploadPhoto,
  isUploading,
}) => {
  //set states
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState('');
  const [tags, setTags] = useState('');
  const [tagsError, setTagsError] = useState(false);

  //on file input change
  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //create an url for live preview of image
    const url = URL.createObjectURL(e.target.files[0]);

    //set the image and url state
    setImageFile(e.target.files[0]);
    setPreviewImage(url);
  };

  //for handling uploading photos
  const onUploadBtnClick = () => {
    //validation checks
    if (tags.match(/#/g)?.length > 1) {
      if (!tags.includes(',') || tags.includes(' ')) {
        return setTagsError(true);
      }
    }

    //create a form and append to it
    let formData = new FormData();

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (caption) {
      formData.append('caption', caption);
    }

    if (tags) {
      formData.append('tags', tags);
    }

    //make request to api

    onUploadPhoto(formData, isProfileModal);
  };

  return (
    <div className={classes.modal} onClick={e => e.stopPropagation()}>
      <button className={classes.btnClose} onClick={onClose}>
        <FaTimes />
      </button>

      <div className={classes.uploadControl}>
        <input type="file" id="image" onChange={onFileInputChange} />
        <label htmlFor="image">Choose an image</label>
        <button onClick={onUploadBtnClick}>
          {isUploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </div>

      {!isProfileModal && (
        <textarea
          rows={2}
          placeholder="Enter a caption"
          onChange={e => setCaption(e.target.value)}
        ></textarea>
      )}

      {!isProfileModal && (
        <textarea
          rows={2}
          placeholder="Eg. #Tag1,#Tag2"
          className={tagsError ? classes.error : null}
          onChange={e => {
            setTags(e.target.value);

            if (tagsError) {
              if (e.target.value.match(/#/g)?.length > 1) {
                if (
                  e.target.value.includes(',') &&
                  !e.target.value.includes(' ')
                ) {
                  setTagsError(false);
                }
              }
            }
          }}
        ></textarea>
      )}

      {tagsError && (
        <p className={classes.errorMessage}>
          Tags should not have empty spaces and replace the spaces with ','
        </p>
      )}

      <div className={classes.imagePreview}>
        {previewImage ? (
          <img src={previewImage} alt="Live preview" />
        ) : (
          'Live preview your image here'
        )}
      </div>
    </div>
  );
};

export default Modal;
