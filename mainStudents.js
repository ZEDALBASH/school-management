var Name = document.getElementById("Name");
var birthdate = document.getElementById("Birthdate");
var Class = document.getElementById("class");
var address = document.getElementById("Address");
var submit = document.getElementById("submit")
var mode = "create"

var dataArry = [];
if (localStorage.results != null){
    dataArry = JSON.parse(localStorage.results);
}
else {
    dataArry = [];
}
var num = (function() {
    const results = localStorage.getItem("resluts");

    try {
    let parseResults = JSON.parse(results);

    if ((!Array.isArray(parseResults), parseResults != null)) {
        throw new Error("is not array")
    }
    return Math.max(...parseResults.map((item) => item.Num));
}
catch (err) {
    console.log(err);
    return 0;
}})();
var arryIndex;

submit.onclick = function(){
if (Name.value != "", birthdate != "", Class != "", address != ""){
    let result = {
        Num:num,
        name: Name.value,
        Birthdate: birthdate.value,
        oClass: Class.value,
        Address: address.value,
    };
    if (mode == "create"){
        result.Num += 1;
        num++;
        dataArry.push(result);
    }
    else if(mode == "edit"){
        dataArry[arryIndex] = result;
        mode == "create";
        submit.innerHTML = "Add";

    }
    localStorage.setItem("results", JSON.stringify(dataArry))
    clearInput();
}
else {
    alert("Filed must not be empty!")
}
    readData();
}
function clearInput()
{
    Name.value = "";
    birthdate.value = "";
    Class.value = "";
    Address.value = "";
}

function datePlaceholder(){
    if (birthdate.value == ""){
        birthdate.style.color = "rgba(0,0,0,0.5";
    } else if(birthdate.value != ""){
        birthdate.style.color = "rgb(0,0,0)"
    }
}

birthdate.onblur = datePlaceholder;
birthdate.onfocus = function (){
    birthdate.style.color = "rgb(0,0,0)"
}

function readData(){
    let table = "";
    for (let i = 0; i < dataArry.length; i++){
        table += `
        <tr>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].Birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Class">${dataArry[i].oClass}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].Address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
}
readData();

function deleteData(i){
    dataArry.splice(i,1);
    localStorage.results = JSON.stringify(dataArry);
    readData();
}

function update(i){
    submit.innerHTML = "edit";
    mode = "edit";
    Name.value = dataArry[i].name;
    birthdate.value = dataArry[i].Birthdate;
    Class.value = dataArry[i].oClass;
    address.value = dataArry[i].Address;
    arryIndex = i;
    datePlaceholder();
    scroll({
        top: 0, 
    behavior: "smooth",
    });
};

var searchMode = "name";

function search(value){
    let table = "";
    for (let i = 0; i < dataArry.length; i++){
        if (searchMode == "name"){
            if(dataArry[i].name.includes(value)){
                table += `<tr>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].Birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Class">${dataArry[i].oClass}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].Address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>`
            }
        }
        else if (searchMode == "number"){
            if(dataArry[i].Num.toString().includes(value)){
                table +=
                `<tr>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].Birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Class">${dataArry[i].oClass}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].Address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>`
            }
        }
    
    }
    document.getElementById("tbody").innerHTML = table;
}