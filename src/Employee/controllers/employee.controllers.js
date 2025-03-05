const { createEmployee } = require("../services/employee.services");
const { validateEmployeeData } = require("../validators/employee.validators");
const { getEmployeeById } = require("../services/employee.services");
const { updateEmployeeDesignation } = require("../services/employee.services");
const { validateDesignationUpdate } = require("../validators/employee.validators");
const { getEmployeeList } = require("../services/employee.services");
const { validateEmployeeListQuery } = require("../validators/employee.validators");
const { deleteEmployee } = require("../services/employee.services");
const { validateDeleteEmployee } = require("../validators/employee.validators");

async function createEmployeeController(req, res) {
  const validation = validateEmployeeData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ success: false, errorCode: -1, message: validation.message, result: [] });
  }

  try {
    const employee = await createEmployee(req.body);
    res.status(201).json({ success: true, message: "Employee Created Successfully", result: [employee] });
  } catch (error) {
    res.status(500).json({ success: false, errorCode: -1, message: "Internal Server Error", result: [] });
  }
}

async function getEmployeeController(req, res) {
    const empId = req.params.empId;
    
    try {
      const employee = await getEmployeeById(empId);
      
      if (!employee) {
        return res.status(404).json({ success: false, errorCode: -1, message: "Employee not found", result: [] });
      }
  
      res.status(200).json({ success: true, message: "Employee fetched Successfully", result: [employee] });
    } catch (error) {
      res.status(500).json({ success: false, errorCode: -1, message: "Internal Server Error", result: [] });
    }
  }

async function updateDesignationController(req, res) {
  const validation = validateDesignationUpdate(req.body);
  
  if (!validation.valid) {
    return res.status(400).json({ success: false, errorCode: -1, message: validation.message, result: [] });
  }

  try {
    const updatedEmployee = await updateEmployeeDesignation(req.body.empId, req.body.designation);

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, errorCode: -1, message: "Employee not found", result: [] });
    }

    res.status(200).json({ success: true, message: "Employee designation updated Successfully", result: [updatedEmployee] });
  } catch (error) {
    res.status(500).json({ success: false, errorCode: -1, message: "Internal Server Error", result: [] });
  }
}

async function getEmployeeListController(req, res) {
  const validation = validateEmployeeListQuery(req.query);

  if (!validation.valid) {
    return res.status(400).json({ success: false, errorCode: -1, message: validation.message, result: [] });
  }

  try {
    const { start, offset, searchKey } = validation;
    const employees = await getEmployeeList(start, offset, searchKey);

    res.status(200).json({ success: true, message: "Employee list fetched successfully", result: employees });
  } catch (error) {
    res.status(500).json({ success: false, errorCode: -1, message: "Internal Server Error", result: [] });
  }
}

async function deleteEmployeeController(req, res) {
  const validation = validateDeleteEmployee(req.body);

  if (!validation.valid) {
    return res.status(400).json({ success: false, errorCode: -1, message: validation.message, result: [] });
  }

  try {
    const response = await deleteEmployee(req.body.empId);
    
    if (!response.success) {
      return res.status(404).json({ success: false, errorCode: -1, message: response.message, result: [] });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ success: false, errorCode: -1, message: "Internal Server Error", result: [] });
  }
}

module.exports = { createEmployeeController, getEmployeeController, updateDesignationController, getEmployeeListController, deleteEmployeeController };
