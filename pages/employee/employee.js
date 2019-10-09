window.empConfig = [
  {
    title: "ID",
    key: "employeeID",
    type:"number",
    required:true,
    unique:true
  },
  {
    title: "Name",
    key: "name",
    type:"text",
    required:true,
    unique:false
  },
  {
    title: "Age",
    key: "age",
    type:"number",
    required:false,
    unique:false
  },
  {
    title: "Phone",
    key: "phone",
    type:"number",
    required:false,
    unique:true
  }
];
window.empData = JSON.parse(localStorage.getItem("employeeData"));
