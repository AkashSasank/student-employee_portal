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

window.readForm = (config,entity) =>{
    let newData = {}
    for(let [key,value] of Object.entries(config)){
        let input = document.getElementById(value.key)
        newData[value.key] = input.value
    }
    let data = JSON.parse(localStorage.getItem(entity));
    if (data == null || data == undefined){
        data = [];
    }
    data.push(newData);
    localStorage.setItem(entity,JSON.stringify(data))
    window.resetForm();
};


window.resetForm = ()=>{
    document.getElementById('form').reset();
}
})