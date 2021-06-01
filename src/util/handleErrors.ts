import toastify from './toast';

const handleErrors = (err, history, message) => {
  //for validation errors
  if (err.response.status === 422) {
    err.response.data.errors.forEach(error => {
      toastify(false, error);
    });
  } else if (
    //for bad requests, unauthorized and not found error
    err.response.status === 400 ||
    err.response.status === 401 ||
    err.response.status === 404 ||
    err.response.status === 403
  ) {
    toastify(false, err.response.data.message);

    //navigate ue to login page if unauthorized error
    if (err.response.status === 401) {
      history.push('/login');
    }
  } else {
    //for internal server errors
    toastify(false, message);
  }
};

export default handleErrors;
