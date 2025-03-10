const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employee.routes");

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/employeedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", employeeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});