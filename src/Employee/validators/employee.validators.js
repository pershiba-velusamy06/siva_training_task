const validator = require("validator");

function validateEmployeeData(data) {
  const requiredFields = [
    "employeeName", "age", "experience", "designation", 
    "gender", "city", "country", "phoneNumber", "countryCode", "email"
  ]; 

  for (let field of requiredFields) {
    if (!data[field]) {
      return { valid: false, message: `${field} is required` };
    }
  }

  const age = Number(data.age);
  const experience = Number(data.experience);

  if (isNaN(age) || age < 18 || age > 100) {
    return { valid: false, message: "Age must be a number between 18 and 100" };
  }

  if (isNaN(experience) || experience < 0) {
    return { valid: false, message: "Experience must be a valid number and cannot be negative" };
  }

  if (!validator.isEmail(data.email)) {
    return { valid: false, message: "Invalid email format" };
  }

  if (!validator.isMobilePhone(data.phoneNumber, "any")) {
    return { valid: false, message: "Invalid phone number" };
  }

  if (!data.countryCode || typeof data.countryCode !== "string") {
    return { valid: false, message: "Country code is required and must be a string" };
  }

  return { valid: true };
}

function validateDesignationUpdate(data) {
  const requiredFields = ["designation", "empId"];
  const allowedFields = new Set(requiredFields);

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

  const extraKeys = Object.keys(data).filter(key => !allowedFields.has(key));
  if (extraKeys.length > 0) {
    return { valid: false, message: `Invalid field(s) detected: ${extraKeys.join(", ")}` };
  }

  return { valid: true };
}

function validateEmployeeListQuery(query) {
  let { start, offset, searchKey } = query;
  if (!start || !offset || !searchKey) { 
    return { valid: false, message: "start, offset, and searchKey are required query parameters" };
  }
  const allowedParams = ["start", "offset", "searchKey"];
  const extraParams = Object.keys(query).filter((param) => !allowedParams.includes(param));

  if (extraParams.length > 0) {
    return { valid: false, message: `Invalid query parameter(s): ${extraParams.join(", ")}` };
  }
  start = parseInt(start);
  offset = parseInt(offset);

  if (isNaN(start) || start < 0) {
    return { valid: false, message: "Start must be a non-negative number" };
  }

  if (isNaN(offset) || offset < 1) {
    offset = 10;
  }

  if (start === 0) {
    start = 1;
  }

  return { valid: true, start, offset, searchKey };
}

function validateDeleteEmployee(body) {
  const allowedKeys = ["empId"];
  if (!body.empId) {
    return { valid: false, message: "empId is required" };
  }
  if (typeof body.empId !== "string" || body.empId.trim() === "") {
    return { valid: false, message: "empId must be a valid string" };
  }
  const extraKeys = Object.keys(body).filter((key) => !allowedKeys.includes(key));
  if (extraKeys.length > 0) {
    return { valid: false, message: `Invalid key(s) provided: ${extraKeys.join(", ")}` };
  }

  return { valid: true };
}

module.exports = { validateEmployeeData, validateDesignationUpdate, validateEmployeeListQuery, validateDeleteEmployee };