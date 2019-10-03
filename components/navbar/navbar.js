$(() => {
  window.menu = [
    {
      title: "home",
      route: "home.html"
    },
    {
      title: "students",
      route: "students.html"
    },
    {
      title: "employee",
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
    let menuStr = event.target.text;
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
       
        break;
      case "employee":
        window.createForm("empForm",window.empConfig)
        window.createTable("employeeTbl", window.empConfig, window.empData);
        window.config = window.empConfig;
        window.tableDiv = "employeeTbl"
        window.entity = 'employeeData' 
        break;

      default:
        break;
    }
    window.sortMode = 'ascending'
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
