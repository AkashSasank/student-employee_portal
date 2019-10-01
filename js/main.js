$(() => {
  //Load header
  $("#header").load("./components/header/header.html", () => {
    //Add menu to nav bar
    let navMenuHtml = buildList(window.menu);
    $("#headerMenu").html(navMenuHtml);
    setActiveInitial();
  });

  //Load Content - Initially
  $("#content").load("./pages/home/home.html");
  window.location.hash = "#home";

  //Load footer
  $("#footer").load("./components/footer/footer.html");

  //Initial set active menu
  let selector, elems;
  selector = "ul li a";
  setActiveInitial = () => {
    elems = document.querySelectorAll(selector);
    elems[0].classList.add("active");
  };
});
