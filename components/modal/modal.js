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
        if(value.required){
            label.innerHTML = label.textContent +"<sup>*</sup>"
        }
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
        if(value.unique && inputText.length > 0){
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
      if(val[field] === value && val[field].length>0){
       status = status && false;
      }
    });
    return status;
  }
  
})