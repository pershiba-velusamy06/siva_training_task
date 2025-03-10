const { validateEmployeeData } = require("../validators/employee.validators");
const { getEmployeeById } = require("../services/employee.services");
const { updateEmployeeDesignation } = require("../services/employee.services");
const { validateDesignationUpdate } = require("../validators/employee.validators");
const { getEmployeeList } = require("../services/employee.services");
const { validateEmployeeListQuery } = require("../validators/employee.validators");
const { deleteEmployee } = require("../services/employee.services");
const { validateDeleteEmployee } = require("../validators/employee.validators");
const Employee = require("../models/employee.model");
const { generateEmpId } = require("../services/employee.services");

async function createEmployeeController(req, res) {
  try {

    const validation = validateEmployeeData(req.body);
    if (!validation.valid) {
      return res.status(500).json({
        success: false,
        errorCode: -1,
        message: validation.message,
        result: [],
      });
    }

  
    const allowedFields = [
      "employeeName", "age", "experience", "designation", 
      "gender", "city", "country", "phoneNumber", "countryCode", "email"
    ];
    
  
    const extraKeys = Object.keys(req.body).filter(key => !allowedFields.includes(key));
    if (extraKeys.length > 0) {
      return res.status(500).json({
        success: false,
        errorCode: -1,
        message: `Invalid field(s) detected: ${extraKeys.join(", ")}`,
        result: [],
      });
    }

    const formattedPhoneNumber = `${req.body.countryCode}${req.body.phoneNumber}`;
    const existingEmployee = await Employee.findOne({
      $or: [{ phoneNumber: formattedPhoneNumber }, { email: req.body.email }],
    });

    if (existingEmployee) {
      return res.status(500).json({
        success: false,
        errorCode: -1,
        message: "Employee with this email or phone number already exists",
        result: [],
      });
    }


    const newEmpId = await generateEmpId();

  
    const employeeData = {
      ...req.body,
      empId: newEmpId, 
      phoneNumber: formattedPhoneNumber, 
    };

    const employee = await Employee.create(employeeData);

    const resultObject = {
      employeeName: employee.employeeName,
      empId: employee.empId,
      age: employee.age,
      experience: employee.experience,
      designation: employee.designation,
      gender: employee.gender,
      city: employee.city,
      country: employee.country,
      phoneNumber: employee.phoneNumber, 
      countryCode: req.body.countryCode,
      email: employee.email,
    };

    return res.status(200).json({
      success: true,
      message: "Employee Created Successfully",
      result: [resultObject],
    });

  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      success: false,
      errorCode: -1,
      message: "Internal Server Error",
      error: error.message,
      result: [],
    });
  }
}

async function getEmployeeController(req, res) {
  const empId = req.params.empId;
  
  try {
      const employee = await getEmployeeById(empId);
      
      if (!employee) {
          return res.status(500).json({
              success: false, 
              errorCode: -1, 
              message: "Employee not found", 
              result: [] 
          });
      }

      const formattedEmployee = {
          employeeName: employee.employeeName,
          empId: employee.empId,
          age: employee.age,
          experience: employee.experience,
          designation: employee.designation,
          gender: employee.gender,
          city: employee.city,
          country: employee.country,
          phoneNumber: employee.phoneNumber,
          countryCode: employee.countryCode,
          email: employee.email
      };

      res.status(200).json({ 
          success: true, 
          message: "Employee fetched Successfully", 
          result: [formattedEmployee] 
      });
  } catch (error) {
      console.error("Error fetching employee:", error);
      return res.status(500).json({ 
          success: false, 
          errorCode: -1, 
          message: "Internal Server Error", 
          result: [] 
      });
  }
}
async function updateDesignationController(req, res) {
  const validation = validateDesignationUpdate(req.body);
  if (!validation.valid) {
    return res.status(500).json({
      success: false,
      errorCode: -1,
      message: validation.message,
      result: [],
    });
  }

  try {
    const employee = await Employee.findOne({ empId: req.body.empId });

    if (!employee) {
      return res.status(500).json({
        success: false,
        errorCode: -1,
        message: "Employee not found",
        result: [],
      });
    }

    employee.designation = req.body.designation;
    await employee.save();

    const resultObject = {
      employeeName: employee.employeeName || "",
      empId: employee.empId || "",
      age: employee.age || "",
      experience: employee.experience || "",
      designation: employee.designation || "",
      gender: employee.gender || "",
      city: employee.city || "",
      country: employee.country || "",
      phoneNumber: employee.phoneNumber || "",
      countryCode: employee.countryCode || "",
      email: employee.email || "",
    };

    return res.status(200).json({
      success: true,
      message: "Employee designation updated Successfully",
      result: [resultObject],
    });

  } catch (error) {
    console.error("Error updating designation:", error);
    return res.status(500).json({
      success: false,
      errorCode: -1,
      message: "Internal Server Error",
      result: [],
    });
  }
}

async function getEmployeeListController(req, res) {
  const validation = validateEmployeeListQuery(req.query);
  if (!validation.valid) {
      return res.status(500).json({ 
          success: false, 
          errorCode: -1, 
          message: validation.message, 
          result: [] 
      });
  }

  const { start, offset, searchKey } = validation;

  try {
      const employees = await getEmployeeList(start, offset, searchKey);
      const formattedEmployees = employees.map(emp => ({
          employeeName: emp.employeeName,
          empId: emp.empId,
          age: emp.age,
          experience: emp.experience,
          designation: emp.designation,
          gender: emp.gender,
          city: emp.city,
          country: emp.country,
          phoneNumber: emp.phoneNumber,
          countryCode: emp.countryCode,
          email: emp.email
      }));

      return res.status(200).json({ 
          success: true, 
          message: "Employee fetched Successfully", 
          result: formattedEmployees 
      });
  } catch (error) {
      console.error("Error fetching employees:", error);
      return res.status(500).json({ 
          success: false, 
          errorCode: -1, 
          message: "Internal Server Error", 
          result: [] 
      });
  }
}

async function deleteEmployeeController(req, res) {
  const validation = validateDeleteEmployee(req.body);

  if (!validation.valid) {
    return res.status(500).json({
      success: false,
      errorCode: -1,
      message: validation.message,
      result: {},
    });
  }

  try {
    const response = await deleteEmployee(req.body.empId);
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        errorCode: -1,
        message: response.message,
        result: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      result: {},
    });

  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({
      success: false,
      errorCode: -1,
      message: "Internal Server Error",
      result: {},
    });
  }
}

module.exports = { createEmployeeController, getEmployeeController, updateDesignationController, getEmployeeListController, deleteEmployeeController };
