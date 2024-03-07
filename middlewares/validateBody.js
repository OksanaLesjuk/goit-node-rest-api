import { HttpError } from "../helpers/HttpError.js";

export const validateBody = (schema) => {

  const func = (req, _, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};


