const validator = require("validator");

function validateEmployeeData(data) {
  const requiredFields = ["employeeName", "age", "experience", "designation", "gender", "city", "country", "phoneNumber", "countryCode", "email"];
  for (let field of requiredFields) {
    if (!data[field]) {
      return { valid: false, message: `${field} is required` };
    }
  }

  if (typeof data.age !== "number" || data.age < 18) return { valid: false, message: "Age must be a number greater than 18" };
  if (typeof data.experience !== "number") return { valid: false, message: "Experience must be a number" };
  if (!validator.isEmail(data.email)) return { valid: false, message: "Invalid email format" };
  if (!validator.isMobilePhone(data.phoneNumber, "any") || data.phoneNumber.length < 8 || data.phoneNumber.length > 12) return { valid: false, message: "Invalid phone number" };

  return { valid: true };
}

function validateDesignationUpdate(data) {
  const requiredFields = ["designation", "empId"];

  for (let field of requiredFields) {
    if (!data[field]) {
      return { valid: false, message: `${field} is required` };
    }
  }

  if (typeof data.designation !== "string" || data.designation.trim() === "") {
    return { valid: false, message: "Designation must be a non-empty string" };
  }

  if (typeof data.empId !== "string" || data.empId.trim() === "") {
    return { valid: false, message: "empId must be a non-empty string" };
  }

  return { valid: true };
}

function validateEmployeeListQuery(query) {
  let { start, offset, searchKey } = query;

  // Ensure required params exist
  if (!start || !offset) {
    return { valid: false, message: "Both start and offset query parameters are required" };
  }

  // Ensure only allowed params are passed
  const allowedParams = ["start", "offset", "searchKey"];
  const extraParams = Object.keys(query).filter((param) => !allowedParams.includes(param));

  if (extraParams.length > 0) {
    return { valid: false, message: `Invalid query parameter(s): ${extraParams.join(", ")}` };
  }

  // Convert to numbers and check validity
  start = parseInt(start);
  offset = parseInt(offset);

  if (isNaN(start) || isNaN(offset) || start < 1) {
    return { valid: false, message: "Start must be a positive number" };
  }

  if (isNaN(offset) || offset < 1) {
    offset = 10; // Default to 10 employees if offset is invalid
  }

  return { valid: true, start, offset, searchKey };
}

function validateDeleteEmployee(body) {
  const allowedKeys = ["empId"];

  // Check if required keys exist
  if (!body.empId) {
    return { valid: false, message: "empId is required" };
  }

  // Check if empId is a string and not empty
  if (typeof body.empId !== "string" || body.empId.trim() === "") {
    return { valid: false, message: "empId must be a valid string" };
  }

  // Ensure no extra keys are passed
  const extraKeys = Object.keys(body).filter((key) => !allowedKeys.includes(key));
  if (extraKeys.length > 0) {
    return { valid: false, message: `Invalid key(s) provided: ${extraKeys.join(", ")}` };
  }

  return { valid: true };
}

module.exports = { validateEmployeeData, validateDesignationUpdate, validateEmployeeListQuery, validateDeleteEmployee };