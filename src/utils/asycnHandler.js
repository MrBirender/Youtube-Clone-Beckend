// using .then and .catch resolving promises:

const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

// using async await

// export const asyncHandler = (fn) => async (res, req, next) => {
//   try {
//     await fn(res, req, next);
//   } catch (error) {
//     req
//       .status(err.code || 500)
//       .json({ success: false, message: error.message });
//   }
// };