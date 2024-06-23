var Name = document.getElementById("inputName");
var Selector = document.getElementById("inputSelector");
var submit = document.getElementById("submit");

const teachersOptions = JSON.parse(localStorage.getItem("resultsTeachers"))


loadDataSelector();

console.log(teachersOptions[0].name)
var dataArry = [];
if(localStorage.reslutsSubjects != null){
    dataArry = JSON.parse(localStorage.reslutsSubjects)
}


submit.onclick = function ()
{
    let result = {
        name:Name.value,
        selector: Selector.value 
    }
    dataArry.push(result);
    localStorage.setItem("reslutsSubjects", JSON.stringify(dataArry))
    console.log(dataArry)
        
    clearInput()
    readData(  )
}

function loadDataSelector(){
    var options = `<option value="" disabled selected hidden >Teacher</option>`;
    for(let i = 0; i < teachersOptions.length; i++){

        options += `
        
        <option >${teachersOptions[i].name}</option>
        `


    }
     
    Selector.innerHTML = options;
}

function clearInput(){
    Name.value = ""
    Selector.value = "";
}

function readData(){
    let table = "";
    for(let i = 0; i <dataArry.length; i++){
        table += `
              <tr class="tr-td">
              <td class="td-Num">1</td>
              <td class="td-border"></td>
              <td class="td-Name">${dataArry[i].name} </td>
              <td class="td-border"></td>
              <td class="td-Teacher">${dataArry[i].selector}</td>
              <td class="td-border"></td>
              <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
              </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
}
readData()

function deleteData(i){
    dataArry.splice(i,1)
    localStorage.reslutsSubjects = JSON.stringify(dataArry)
    readData()
}

function update(i){
    Selector.value = dataArry[i].selector
    Name.value = dataArry[i].name
}