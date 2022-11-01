const { body, validationResult } = require("express-validator");
const createCollegeRules = () => {
  return [
    body("name").notEmpty(),
    body("fullName").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("phone").notEmpty(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  createCollegeRules,
  validate,
};