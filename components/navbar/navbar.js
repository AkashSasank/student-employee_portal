$(() => {
  window.menu = [
    {
      title: "Home",
      route: "home.html"
    },
    {
      title: "Students",
      route: "students.html"
    },
    {
      title: "Employee",
      route: "employee.html"
    }
  ];

  buildList = data => {
    let html = "<ul>";
    for (item in data) {
      html += "<li><a onclick='clickMenu()'>" + data[item].title + "</a></li>";
    }
    html += "</ul>";
    return html;
  };

  clickMenu = () => {
    let menuStr = event.target.text.toLowerCase();
    window.location.hash = "#" + menuStr;
    setContent(menuStr);
    createActiveMenu(menuStr);
  };

  setContent = menuStr => {
    $("#content").load("./pages/" + menuStr + "/" + menuStr + ".html", () => {
      setData(menuStr);
    });
  };

  setData = menu => {
    switch (menu) {
      case "students":
        window.createForm("studForm",window.studConfig)
        window.createTable("studentsTbl", window.studConfig, window.studData);
        window.config = window.studConfig;
        window.tableDiv = "studentsTbl"
        window.entity = 'studentData' 
        if(window.studData.length == 0){
      document.getElementById("studentsTbl").style.display = "none"
      } 
       
        break;
      case "employee":
        window.createForm("empForm",window.empConfig)
        window.createTable("employeeTbl", window.empConfig, window.empData);
        window.config = window.empConfig;
        window.tableDiv = "employeeTbl"
        window.entity = 'employeeData' 
        if(window.empData.length == 0){
          document.getElementById("employeeTbl").style.display = "none"
          } 
        break;

      default:
        break;
    }
    window.sortMode = 'ascending'
    // if(JSON.parse(localStorage.getItem(entity)).length == 0){
    //   document.getElementById(tableDiv).style.display = "none"
    // }   
  };

  let selector, elems;
  selector = "ul li a";
  createActiveMenu = activeMenu => {
    elems = document.querySelectorAll(selector);
    elems.forEach(elem => {
      elem.classList.remove("active");
      elem.text == activeMenu ? elem.classList.add("active") : "";
    });
  };
});
