// create error handler

const errorHandller = (error, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({ message: error.message });
};

// export errorHandller

export default errorHandller;
