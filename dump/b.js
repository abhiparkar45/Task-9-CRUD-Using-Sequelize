const db = require("../../models/index");

exports.createCollege = async (data) => {
  const isPhoneExist = await db.College.findOne({
    where: { phone: data.phone },
  });
  if(isPhoneExist) {
    return {
        status: 500,
        message: "Phone number already exists",
        result: null,
      };
  }
  const result = await db.College.create({
    name: data.name,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
  });
  if (result) {
    return { status: 200, message: "College created successfully", result };
  } else {
    return {
      status: 500,
      message: "Error occured while creating College",
      result: null,
    };
  }
};