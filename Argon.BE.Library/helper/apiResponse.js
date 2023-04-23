const apiResponse = (response) => {
  return {
    meta: {
      code: response.status,
      status: response.success ? "Success" : "Failed",
      message: response.message,
    },
    data: response.data,
  };
};

export default apiResponse;
