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
        if(value.required){
            input.required = true
        }
        label.for = value.key;
        label.textContent = value.title;
        form.appendChild(label)
        form.appendChild(input)
    }
    formWindow.appendChild(form);
};

window.readForm = () =>{
    let config = window.config;
    let data = JSON.parse(localStorage.getItem(entity));
    if (data == null || data == undefined){
        data = [];
    }
    let tableDiv = window.tableDiv;
    let newData = {}
    let buffer =[]
    let status = true;
    for(let [key,value] of Object.entries(config)){
        let input = document.getElementById(value.key)
        let inputText = input.value
       if(value.required){
        if(inputText.length > 0){
            if(value.regex.test(inputText)){
                newData[value.key] = inputText
            }
            else{
                alert("Enter a valid "+value.key)
                status = false;
            break;
            }
            
        }
        else{
            alert("Fill the mandatory fields")
            status = false;
            break;
        }
        }
        if(value.unique){
            status = window.isUnique(inputText,data,value.key)
            if(status){
                if(value.regex.test(inputText)){
                    newData[value.key] = inputText
                }
                else{
                    alert("Enter a valid "+value.key)
                    status = false;
                break;
                }
            }
            else{
                alert("Record already exists");
                break;
            }
       }
       else{
        newData[value.key] = inputText
       }
        // buffer.push(inputText)//
    }
    if(status ){
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
        window.createTable(tableDiv,config,data);
        window.resetForm();
    }
    $("#formDiv").load(location.href + " #formDiv");

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
        console.log(val[field])
        console.log(value)
      if(val[field] === value){
       status = status && false;
      }
    });
    return status;
  }
  
window.check=(myform)=>{//form validation
    // var nameRegex = /^[a-zA-Z\s]+$/;
    // var emailRegex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
    // var contactRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    // myform.map((val)=>{  return (val== ""||val== null)})
    if(myform.map((val)=>{ return (val == ""||val == null)}).every((val)=>{return val == true}) === true){
      return false;
    }
    else{
      return true;
      }
  }
})