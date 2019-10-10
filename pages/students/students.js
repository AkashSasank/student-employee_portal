
window.studConfig = [
  {
    title: "ID",
    key: "studentID",
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
  }
];

window.studData = JSON.parse(localStorage.getItem("studentData"));
