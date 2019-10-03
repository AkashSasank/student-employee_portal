$(() => {
  window.createTable = (tableDiv, config, data) => {
    console.log(data)
    if(data !== null){
      let myTableDiv = document.getElementById(tableDiv);
      myTableDiv.innerHTML = ""
      let table = document.createElement("table");
      let tableHead = document.createElement("thead")
      let tableBody = document.createElement("tbody");
      tableBody.id = "tableBody"
      table.appendChild(tableHead);
  
      //Table header
      let tr = document.createElement("tr");
      tableHead.appendChild(tr);
      for (let [key, value] of Object.entries(config)) {
        let th = document.createElement("th");
        th.width = "75";
        th.appendChild(document.createTextNode(value.title));
        let i = document.createElement("i");
        switch(window.sortMode){
          case 'ascending':
              i.setAttribute("class",'glyphicon glyphicon-chevron-down');
              break;
          case 'descending':
              i.setAttribute("class",'glyphicon glyphicon-chevron-up');
              break;
            default:
              i.setAttribute("class",'glyphicon glyphicon-chevron-down');
              break;
        }
      
        th.appendChild(i);
        th.id = value.key
        console.log(window.sortMode)
        th.addEventListener("click",()=>{
          window.sortData(window.sortMode)
        })
        // th.setAttribute("onclick","window.sortData('ascending')")
        tr.appendChild(th);
      }
      let th = document.createElement("th");
      th.width = "75";
      th.appendChild(document.createTextNode("Actions"));
      tr.appendChild(th);
      table.appendChild(tableHead);
      // Table body
      data.forEach((row, rowIdx) => {
        let tr = document.createElement("tr");
        for (const col in row) {
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(row[col]));
          tr.appendChild(td);
        }
        //Add actions column
        let col =  document.createElement('td');
        let d = document.createElement("div");
        d.setAttribute("class","modal-cont");
        let del = document.createElement("button");//delete button
        let edit = document.createElement("button");//edit button
        del.setAttribute("class","btn btn-danger");
        edit.setAttribute("class","btn btn-warning");
        edit.innerHTML = '<span class="glyphicon glyphicon-pencil">';
        del.innerHTML = '<span class="glyphicon glyphicon-trash">';
        edit.onclick = function() {
          if(confirm("Do you wish to continue?")){
              window.editTable(rowIdx,tableDiv,config,data);

             
            }
        }            
        del.onclick = function() {
          if(confirm("Data will be lost forever!! Do you wish to continue? ")){
                data = deleteRow(rowIdx,data);//sets window data object
                window.createTable(tableDiv, config, data)
              }
        }
        d.appendChild(edit);
        d.appendChild(del);
        col.appendChild(d)
        tr.appendChild(col);
        tableBody.appendChild(tr);
      });
      table.appendChild(tableBody)
      myTableDiv.appendChild(table);
      switch(tableDiv){//to save the data in case any edits were made
        case "studentsTbl":
            localStorage.setItem("studentData",JSON.stringify(data))
            break;
        case "employeeTbl":
            localStorage.setItem("employeeData",JSON.stringify(data))
            break;
        default:
            break;
    } 
    };
    }
  
window.editTable=(index,tableDiv,config,data)=>{
  let currentRow = data[index]
  let newData = {}
  for(let [key,value] of Object.entries(config)){
      let input = document.getElementById(value.key)
      console.log(value.key)
      input.value = currentRow[value.key] //sets the input values to that of selected row
  }
  let submit = document.getElementById("submitButton");
  submit.onclick =()=>{
    let buffer = []
    for(let [key,value] of Object.entries(config)){
        let input = document.getElementById(value.key)
        newData[value.key] = input.value
        buffer.push(input.value)
    }
    if(window.check(buffer)){
      data[index]=newData;
      window.createTable(tableDiv, config, data)
    }
    submit.setAttribute("onclick",null);
    submit.setAttribute("onclick", 'window.readForm()');
    window.resetForm();
    return true;//checks if edit is complete
  }
  } 
window.deleteRow =(index,data)=> {
  data.splice(index,1);//remove the row pointed by index
  return data;
  } 


window.searchTable=()=> {//search a given input in the table  
      let input, filter, table, tr, td, i,j, txtValue;
      let index = [];
      input = document.getElementById("search");
      filter = input.value.toString().toUpperCase();
        while(filter.endsWith(" ")){//removes white spaces at end of filter
          filter = filter.slice(0,filter.length-1)
        }
        table = document.getElementById("tableBody");
        tr = table.getElementsByTagName("tr");
        let num = tr[0].getElementsByTagName('td').length
        for (i = 0; i < tr.length; i++) {
          let status = false;
          for(j = 0;j<num;j++){
          td = tr[i].getElementsByTagName("td")[j];     
          txtValue = (td.textContent || td.innerText).toString().slice(0,filter.length);        
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            status = status||true;
            } 
          else {
              tr[i].style.display = "none";
            }    
        }
        if(status){
          index.push(i);
        }
      }
      index.forEach((val)=>{tr[val].style.display = "";})
      if((/^\s+$/).test(filter)){//no action for space bar, simply load the tables
        loadTable();
      } 
  }


window.sortData=(type)=>{  //Sort each field in table by clicking on corresponding table heading
    let tableData = JSON.parse(localStorage.getItem(window.entity));
    let field = event.target.id 
    let l = tableData.length;
    let table_head =  document.getElementById(field);
    // console.log(table_head.lastElementChild)
    let data = []; 
    let index = [];  
    // let f = field.toString(); 
    let sortedData = null;
    for(let i = 0;i<l;i++){
      data.push([tableData[i][field],i]);
    }
    if(isNaN(data[0][0])){
      sortedData = data.sort();//sorting strings
    }
    else{
      sortedData = data.sort(function(a, b){return a[0]-b[0]});//sorting numbers
    }
    for( i =0;i<l;i++){
      index.push(sortedData[i][1]);
    }
   
    let newData = [];
    if(type === 'ascending'){
      for( i =0 ; i<l ; i++){
        newData.push(tableData[index[i]]);
      }
     table_head.setAttribute("onclick",null);
     window.sortMode = "descending"
    //  table_head.lastElementChild.setAttribute("class","glyphicon glyphicon-chevron-down");
    // console.log(newData)
    }
    else if(type === 'descending'){
      for( i =0 ; i<l ; i++){
        newData.unshift(tableData[index[i]]);
      } 
      table_head.setAttribute("onclick",null);
      window.sortMode = "ascending"
      // table_head.lastElementChild.setAttribute("class","glyphicon glyphicon-chevron-up");
      // console.log(newData)
    }

    localStorage.setItem(window.entity,JSON.stringify(newData));
    window.createTable(window.tableDiv,window.config,newData)
  }
});
