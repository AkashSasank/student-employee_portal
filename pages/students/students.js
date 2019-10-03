
window.studConfig = [
  {
    title: "ID",
    key: "studentID",
    type:"number"
  },
  {
    title: "Name",
    key: "name",
    type:"text"
  },
  {
    title: "Age",
    key: "age",
    type:"number"
  }
];

// window.studConfig = ["ID", "Name", "Age"];

// window.studData = [
//   {
//     studentID: 1,
//     name: "Aman",
//     age: "20"
//   },
//   {
//     studentID: 2,
//     name: "Amna",
//     age: "22"
//   },
//   {
//     studentID: 3,
//     name: "Appu",
//     age: "15"
//   },
//   {
//     studentID: 4,
//     name: "Minnu",
//     age: "10"
//   }
// ];
window.studData = JSON.parse(localStorage.getItem("studentData"));
