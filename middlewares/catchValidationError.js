const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    (!errors.isEmpty())?(res.status(400).json({success:false,message:errors.errors[0].msg})):(next());
}