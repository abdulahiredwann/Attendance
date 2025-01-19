const Joi = require("joi");

function validateShift(shift) {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Shift name is required.",
      "any.required": "Shift name is mandatory.",
    }),
    description: Joi.string().optional().allow(null, "").messages({
      "string.base": "Description must be a string.",
    }),
    morningIn: Joi.date().required().messages({
      "date.base": "Morning in time must be a valid date.",
      "any.required": "Morning in time is mandatory.",
    }),
    morningOut: Joi.date().required().messages({
      "date.base": "Morning out time must be a valid date.",
      "any.required": "Morning out time is mandatory.",
    }),
    afternoonIn: Joi.date().required().messages({
      "date.base": "Afternoon in time must be a valid date.",
      "any.required": "Afternoon in time is mandatory.",
    }),
    afternoonOut: Joi.date().required().messages({
      "date.base": "Afternoon out time must be a valid date.",
      "any.required": "Afternoon out time is mandatory.",
    }),
    allowedLateMinutes: Joi.number().integer().min(0).required().messages({
      "number.base": "Allowed late minutes must be a number.",
      "number.min": "Allowed late minutes cannot be negative.",
      "any.required": "Allowed late minutes is mandatory.",
    }),
    totalServerdHrPerDay: Joi.number().positive().required().messages({
      "number.base": "Total served hours per day must be a number.",
      "number.positive":
        "Total served hours per day must be greater than zero.",
      "any.required": "Total served hours per day is mandatory.",
    }),
    scantimeOut: Joi.number().integer().min(0).required().messages({
      "number.base": "Scan timeout must be a number.",
      "number.min": "Scan timeout cannot be negative.",
      "any.required": "Scan timeout is mandatory.",
    }),
  });

  return schema.validate(shift);
}

function validateUsers(users) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
      "string.empty": "First name is required.",
      "string.min": "First name must be at least 2 characters.",
      "string.max": "First name must not exceed 50 characters.",
    }),
    middleName: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Middle name is required.",
      "string.min": "Middle name must be at least 2 characters.",
      "string.max": "Middle name must not exceed 50 characters.",
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Last name is required.",
      "string.min": "Last name must be at least 2 characters.",
      "string.max": "Last name must not exceed 50 characters.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "A valid email address is required.",
      "any.required": "Email is mandatory.",
    }),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.empty": "Phone number is required.",
        "string.pattern.base": "Phone number must be between 10 and 15 digits.",
      }),
    password: Joi.string().min(6).max(128).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters.",
      "string.max": "Password must not exceed 128 characters.",
    }),
    region: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Region is required.",
      "string.min": "Region must be at least 2 characters.",
      "string.max": "Region must not exceed 100 characters.",
    }),
    city: Joi.string().min(2).max(100).required().messages({
      "string.empty": "City is required.",
      "string.min": "City must be at least 2 characters.",
      "string.max": "City must not exceed 100 characters.",
    }),
    emergencyContactName: Joi.string()
      .min(2)
      .max(50)
      .optional()
      .allow(null, "")
      .messages({
        "string.base": "Emergency contact name must be a string.",
        "string.min": "Emergency contact name must be at least 2 characters.",
        "string.max": "Emergency contact name must not exceed 50 characters.",
      }),
    emergencyContactPhone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .optional()
      .allow(null, "")
      .messages({
        "string.pattern.base":
          "Emergency contact phone must be between 10 and 15 digits.",
      }),
    role: Joi.string().valid("ADMIN", "HR_MANAGER").required().messages({
      "any.only": "Role must be either ADMIN, HR_MANAGER,",
      "any.required": "Role is mandatory.",
    }),
  });

  return schema.validate(users);
}

module.exports = { validateShift, validateUsers };
