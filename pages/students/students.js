
window.studConfig = [
  {
    title: "ID",
    key: "studentID",
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
  }
];

window.studData = JSON.parse(localStorage.getItem("studentData"));
