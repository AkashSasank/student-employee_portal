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
        window.createTable("studentsTbl", window.studConfig, window.studData);
        break;
      case "employee":
        console.log("Employee");
        break;

      default:
        break;
    }
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
