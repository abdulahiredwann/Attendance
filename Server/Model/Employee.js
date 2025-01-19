const Joi = require("joi");
function validateEmployee(employee) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    gender: Joi.string().valid("MALE", "FEMALE").required(),
    middleName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .pattern(/^\d{10,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be between 10 to 15 digits.",
      }),
    password: Joi.string().min(8).max(100).required(),
    region: Joi.string().min(2).max(100).required(),
    city: Joi.string().min(2).max(100).required(),
    emergencyContactName: Joi.string().min(2).max(50).optional(),
    emergencyContactPhone: Joi.string()
      .pattern(/^\d{10,15}$/)
      .optional()
      .messages({
        "string.pattern.base":
          "Emergency contact phone number must be between 10 to 15 digits.",
      }),

    shiftId: Joi.number().integer().positive().required(),
    bankAccountNumber: Joi.string()
      .pattern(/^\d{5,30}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Bank account number must be between 5 to 30 digits.",
      }),
    monthlySalary: Joi.number().positive().required(),
    position: Joi.number().positive().required(),
  });

  return schema.validate(employee);
}

module.exports = validateEmployee;
