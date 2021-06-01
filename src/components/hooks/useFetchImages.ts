import { useState, useEffect } from 'react';
import axios from 'axios';
import { ImageData } from '../../types';
import { apiUrl } from '../../util/api';
import toastify from '../../util/toast';

//number of images per page
const IMAGES_PER_PAGE = 5;

const useFetchImages = (pageNumber: number) => {
  //set initial state
  const [images, setImages] = useState<ImageData[] | []>([]);
  const [totalImages, setTotalImages] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isImagesLoading, setIsImagesLoading] = useState(false);

  //run this function when the page number changes
  useEffect(() => {
    //get token
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      return;
    }

    //start loading
    setIsImagesLoading(true);

    //make get request to api
    axios
      .get(`${apiUrl}/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: pageNumber,
          limit: IMAGES_PER_PAGE,
        },
      })
      .then(res => {
        //add the images to the existing array
        setImages(prevState => [...prevState, ...res.data.images]);

        //update state for total images and stop loading
        setTotalImages(res.data.totalImages);
        setIsImagesLoading(false);
      })
      .catch(err => {
        //stop loading
        setIsImagesLoading(false);

        //notify user
        toastify(false, 'An error occurred while fetching data!');

        //update error state
        setHasError(true);
      });
  }, [pageNumber]);

  return { images, totalImages, hasError, isImagesLoading };
};

export default useFetchImages;
