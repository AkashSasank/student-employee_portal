window.empConfig = [
  {
    title: "ID",
    key: "employeeID",
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
  },
  {
    title: "Phone",
    key: "phone",
    type:"number"
  }
];

// window.studConfig = ["ID", "Name", "Age"];

// window.empData = [
//   {
//     employeeID: 1,
//     name: "Aman",
//     age: "20",
//     phone:"9496143226"
//   },
//   {
//     employeeID: 1,
//     name: "Aman",
//     age: "20",
//     phone:"9496143226"
//   },
//   {
//     employeeID: 1,
//     name: "Aman",
//     age: "20",
//     phone:"9496143226"
//   },
//   {
//     employeeID: 1,
//     name: "Aman",
//     age: "20",
//     phone:"9496143226"
//   }
// ];

window.empData = JSON.parse(localStorage.getItem("employeeData"));