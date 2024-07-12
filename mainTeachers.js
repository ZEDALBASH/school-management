var Name = document.getElementById("nameInputTeachers");
var birthdate = document.getElementById("birthdateInputTeachers");
var address = document.getElementById("addressInputTeachers");
var submit = document.getElementById("submitTeachers");
var searchNameBtn = document.getElementById("searchNameBtnTeachers");
var searchInput = document.getElementById("searchInputTeachers");
var searchNumBtn = document.getElementById("searchNumBtnTeachers");

var num = numCounter(localStorage.getItem("resultsTeachers"));
var mode = "create";
var arryIndex;
var dataArry = [];
if (localStorage.resultsTeachers != null) {
  dataArry = JSON.parse(localStorage.resultsTeachers);
} else {
  dataArry = [];
}
console.log(num);
submit.onclick = function createEdit(i) {
  if ((Name.value != "", birthdate.value != "", address.value != "")) {
    let result = {
      Num: num,
      name: Name.value,
      birthdate: birthdate.value,
      address: address.value,
    };

    if (mode == "create") {
      result.Num += 1;
      num++;
      console.log(result);
      dataArry.push(result);
    } else if (mode == "edit") {
      delete result.Num;
      dataArry[arryIndex] = {...dataArry[arryIndex],...result}
      mode = "create";
      submit.innerHTML = "Add";
    }
    localStorage.setItem("resultsTeachers", JSON.stringify(dataArry));
    console.log(result);
    clearInput();
  } else {
    alert("field must not be empty!");
  }

  readData();
};
function clearInput() {
  Name.value = "";
  address.value = "";
  birthdate.value = "";
}

function readData() {
  let table = "";
  for (let i = 0; i < dataArry.length; i++) {
    table += `
        <tr>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
}
readData();



function deleteData(i) {
  dataArry.splice(i, 1);
  localStorage.resultsTeachers = JSON.stringify(dataArry);
  readData();
}

function update(i) {
  submit.innerHTML = "Update";
  mode = "edit";
  Name.value = dataArry[i].name;
  birthdate.value = dataArry[i].birthdate;
  address.value = dataArry[i].address;
  arryIndex = i;
  datePlaceholder();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}


function datePlaceholder() {
  if (birthdate.value == "") {
    birthdate.style.color = "rgba(0,0,0,0.5)";
  } else if (birthdate.value != "") {
    birthdate.style.color = "rgb(0,0,0)";
  }
}


birthdate.onblur = datePlaceholder;
birthdate.onfocus = function () {
  birthdate.style.color = "rgb(0,0,0)";
};
 
let searchMode = "name";
function getSearchMode(id) {
  if (id == "searchNameBtnTeachers") {
    searchMode = "name";
  } else if (id == "searchNumBtnTeachers") {
    searchMode = "number";
  }

  searchInput.placeholder = "Search by " + searchMode;

  searchInput.focus();
}

function search(value) {
  let table = "";

  for (let i = 0; i < dataArry.length; i++) {
    if (searchMode == "name") {
      if (dataArry[i].name.toLowerCase().includes(value.toLowerCase)) {
        table += `
        <tr>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>
        `;
      }
    } else if (searchMode == "number") {
      if (dataArry[i].Num.toString().includes(value)) {
        table += `
        <tr>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
