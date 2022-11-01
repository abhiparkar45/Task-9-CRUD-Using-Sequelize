const collegeService = require("../services/college.service");

exports.createCollegedata = async (req, res) => {
  const { name, fullName, phone, email } = req.body;
  const response = await collegeService.createCollege({
    name,
    fullName,
    phone,
    email,
  });
  return res
    .status(response.status)
    .json({ message: response.message, result: response.result });
};