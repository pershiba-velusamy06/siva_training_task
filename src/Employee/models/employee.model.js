const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: String,
  employeeName: String,
  age: Number,
  experience: Number,
  designation: String,
  gender: String,
  city: String,
  country: String,
  phoneNumber: String,
  countryCode: String,
  email: String,
});

const Employee = mongoose.model("Employee", employeeSchema, "employeedetails");
module.exports = Employee;
