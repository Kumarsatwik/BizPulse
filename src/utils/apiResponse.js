const apiResponse = {
  successResponse(res, status, message, data) {
    return res.status(status || 200).json({
      status: "success",
      message,
      data,
    });
  },

  errorResponse(res, status, message) {
    return res.status(status || 500).json({
      status: "error",
      message,
    });
  },
};

export default apiResponse;