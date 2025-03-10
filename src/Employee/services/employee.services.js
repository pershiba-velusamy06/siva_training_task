const Employee = require("../models/employee.model");

async function generateEmpId() {
  const lastEmployee = await Employee.findOne().sort({ _id: -1 });
  let empNumber = 1;
  if (lastEmployee) {
    empNumber = parseInt(lastEmployee.empId.replace("ED", "")) + 1;
  }
  return `ED${empNumber.toString().padStart(2, "0")}`;
}

async function createEmployee(employeeData) {
  const empId = await generateEmpId();
  employeeData.empId = empId;
  employeeData.phoneNumber = `${employeeData.countryCode}${employeeData.phoneNumber}`;
  const newEmployee = new Employee(employeeData);
  return await newEmployee.save();
}

async function getEmployeeById(empId) {
    const employee = await Employee.findOne({ empId });
    return employee;
  }
  
  async function updateEmployeeDesignation(empId, newDesignation) {
    const employee = await Employee.findOne({ empId });
  
    if (!employee) {
      return null; // Employee not found
    }
  
    employee.designation = newDesignation;
    await employee.save();
    return employee;
  }
  
  async function getEmployeeList(start, offset, searchKey) {
    const query = {};
  
    if (searchKey) {
      query.$or = [
        { employeeName: { $regex: searchKey, $options: "i" } },
        { designation: { $regex: searchKey, $options: "i" } },
      ];
    }
  
    return await Employee.find(query)
      .skip((start - 1) * offset)
      .limit(offset);
  }
  
  async function deleteEmployee(empId) {
    const employee = await Employee.findOneAndDelete({ empId });
  
    if (!employee) {
      return { success: false, message: "Employee not found", result: [] };
    }
  
    return { success: true, message: "Employee deleted successfully", result: [employee] };
  }
  
module.exports = { createEmployee,generateEmpId, getEmployeeById, updateEmployeeDesignation, getEmployeeList, deleteEmployee };
  
  