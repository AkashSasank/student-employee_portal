window.empConfig = [
  {
    title: "ID",
    key: "employeeID",
    type:"number",
    required:true,
    unique:true,
    regex:/^[0-9]*$/
  },
  {
    title: "Name",
    key: "name",
    type:"text",
    required:true,
    unique:false,
    regex:/^[a-zA-Z\s]+$/
  },
  {
    title: "Age",
    key: "age",
    type:"number",
    required:false,
    unique:false,
    regex:/^[0-9]*$/
  },
  {
    title: "Phone",
    key: "phone",
    type:"number",
    required:false,
    unique:true,
    regex:/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
  },
  {
    title: "Email",
    key: "email",
    type:"email",
    required:false,
    unique:true,
    regex:/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/
  }
];
window.empData = JSON.parse(localStorage.getItem("employeeData"));
