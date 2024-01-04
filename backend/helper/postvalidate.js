import { validationResult } from 'express-validator';
import  constant from "../constant/constant.js"
/**
 * Throw error if failed to validate
 * @param req 
 * @param res 
 * @param next 
 */
const postValidate = (
  req,
  res,
  next
) => {
  const error = validationResult(req);
  const responseError= [];

  if (!error.isEmpty()) {
    for (const errorRow of error.array()) {
      responseError.push({ field: errorRow.path, message: errorRow.msg })
    }
    return res.status(constant.BADREQUEST).send(
      {
        response: {
          status: 400,
          message: "Error!",
          error: true,
          data: responseError
        }
      });

  } else {
    next();
  }
};

export default postValidate;
