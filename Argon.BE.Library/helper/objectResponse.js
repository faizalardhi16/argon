const objectResponse = (status, message, data, success) => {
  return {
    status,
    message,
    data,
    success,
  };
};

export default objectResponse;
