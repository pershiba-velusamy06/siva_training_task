// ADD a new Employee
let nextemployeeid = 1;
function create_new_employee(name,designation, taskstatus, description)
{
    this.employeeid = nextemployeeid++;
    this.name = name;
    this.designation = designation;
    this.taskstatus = taskstatus;
    this.description = description;
    this.employeedetails = function()
    {
        console.log(`EmployeeID:${this.employeeid},Name:${this.name},Designation:${this.designation},Taskstatus:${this.taskstatus},Description:${this.description}`);
    };

}

const employeelist=[];

function addemployee(name, designation, taskStatus, description) {
    const newEmployee = new create_new_employee(name, designation, taskStatus, description);
    employeelist.push(newEmployee);
}

addemployee("Siva","AWS Solution Architect","Completed","Newemployee")
addemployee("Vignesh","Backend Lead","Completed","Lead for Backend Team")
addemployee("Pershiba","Backend Developer","Completed","Backend Node JS developer")
addemployee("Mayuresh"," Developer","pending","AWS Developer")

employeelist.forEach(employee => employee.employeedetails());

// Update employee description

function updateEmployeeDescription(employeeId, newDescription) {
    const employee = employeelist.find(emp => emp.employeeid === employeeId); 
    if (employee) {
        employee.description = newDescription; 
        console.log(`Description updated for EmployeeID: ${employeeId}`);
    } else {
        console.log(`Employee with ID: ${employeeId} not found`);
    }
}

updateEmployeeDescription(2, "CEO");
updateEmployeeDescription(1, "CTO");
employeelist.forEach(employee => employee.employeedetails());

// View Employee Details

function viewEmployeeDetails(employeeId) {
    const employee = employeelist.find(emp => emp.employeeid === employeeId); 
    if (employee) {
        console.log(`Employee ID: ${employee.employeeid}`);
        console.log(`Name: ${employee.name}`);
        console.log(`Designation: ${employee.designation}`);
        console.log(`Task Status: ${employee.taskstatus}`);
        console.log(`Description: ${employee.description}`);
    } else {
        console.log(`Employee with ID: ${employeeId} not found`);
    }
}

viewEmployeeDetails(1)

//Auto-Update Task Status 

function updateTaskStatusAfterDelay(employeeId) {
    const employee = employeelist.find(emp => emp.employeeid === employeeId); 
    if (employee) {
        if (employee.taskstatus === "pending") {
            setTimeout(() => {
                employee.taskstatus = "completed";  
                console.log(`Task status of EmployeeID: ${employeeId} has been updated to "completed"`);
                console.log("\nUpdated Employee Details:");
                employeelist.forEach(emp => {
                    console.log(`EmployeeID: ${emp.employeeid}, Name: ${emp.name}, Designation: ${emp.designation}, Taskstatus: ${emp.taskstatus}, Description: ${emp.description}`);
                });
            }, 5000);
        } else {
            console.log(`Task status for EmployeeID: ${employeeId} is not "pending"`);
        }
    } else {
        console.log(`Employee with ID: ${employeeId} not found`);
    }
}


updateTaskStatusAfterDelay(4)
// delete employee details using employeeID
function deleteEmployee(employeeId) {
    const index = employeelist.findIndex(emp => emp.employeeid === employeeId); 
    if (index !== -1) {
        employeelist.splice(index, 1);  
        console.log(`Employee with ID: ${employeeId} has been deleted.`);
    } else {
        console.log(`Employee with ID: ${employeeId} not found.`);
    }
  
}

deleteEmployee(2)
employeelist.forEach(employee => employee.employeedetails());
