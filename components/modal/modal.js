$(()=>{
window.createForm = (formDiv,config)=>{
    let formWindow = document.getElementById(formDiv);
    let form  = document.createElement("form"); 
    form.id = "form"
    for(let [key,value] of Object.entries(config)){
        let input = document.createElement("input");
        let label = document.createElement("label");
        input.type = value.type;
        input.id = value.key;
        label.for = value.key;
        label.textContent = value.title;
        form.appendChild(label)
        form.appendChild(input)
    }
    formWindow.appendChild(form);
};

window.readForm = () =>{
    let config = window.config;
    let tableDiv = window.tableDiv;
    let newData = {}
    let buffer =[]
    for(let [key,value] of Object.entries(config)){
        let input = document.getElementById(value.key)
        newData[value.key] = input.value
        buffer.push(input.value)
    }
    if(window.check(buffer)){
        switch(tableDiv){
            case "studentsTbl":
                entity = 'studentData';
                break;
            case "employeeTbl":
                entity = 'employeeData';
                break;
            default:
                break;
        }
        let data = JSON.parse(localStorage.getItem(entity));
        if (data == null || data == undefined){
            data = [];
        }
        data.push(newData);
        switch(tableDiv){
            case "studentsTbl":
                window.studData = data;
                break;
            case "employeeTbl":
                window.empData = data;
                break;
            default:
                break;
        }
        localStorage.setItem(entity,JSON.stringify(data))
        window.resetForm();
        window.createTable(tableDiv,config,data);
    }

};


window.resetForm = ()=>{
    document.getElementById('form').reset();
    let submit = document.getElementById("submitButton");//prevent error while using reset inbetween edit
    submit.setAttribute("onclick",null);
    submit.setAttribute("onclick", 'window.readForm()');
}

window.isUnique=(value,data,field)=>{//check if an entry is unique, value - input, data - the entire table data, field - the input field
    let status =  true;
    data.forEach(val => {
      if(val[field].value === value){
       status = status && false;
      }
    });
    return status;
  }
  
window.check=(myform)=>{//form validation
    var nameRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
    var contactRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    // myform.map((val)=>{  return (val== ""||val== null)})
    if(myform.map((val)=>{ return (val == ""||val == null)}).every((val)=>{return val == true}) === true){
      alert("Enter the details before submitting");
      return false;
    }
    // else if (myform[0].value == "" || myform[0].value == null || myform[0].value < 0)//validation for ID
    // {
    //   alert("Enter a valid ID");
    //   return false;
    // }
    // else if (myform[1].value == "" || myform[1].value == null)//validation for empty name
    // {
    //   alert("Name is mandatory");
    //   return false;
    // }
    // else if (nameRegex.test(myform[1].value) === false)//validation for name format
    // {
    //   alert("Enter a valid name");
    //   return false;
    // }
    // else if ( emailRegex.test(myform[4].value)===false)//validation for email
    // {
    //   alert("Enter a valid email");
    //   return false;
    // }
    // else if(contactRegex.test(myform[3].value)===false){//validation for contact number - 10 digit
    //   alert("Enter a valid contact number");
    //   return false;
    // }
    else{
      return true;
      }
  }

})