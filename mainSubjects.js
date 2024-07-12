var Name = document.getElementById("inputName");
var Selector = document.getElementById("inputSelector");
var submit = document.getElementById("submit");

const teachersOptions = JSON.parse(localStorage.getItem("resultsTeachers"));
var mode = "create";

var num = numCounter(localStorage.getItem("resultsSubjects"));
var arryIndex;

var dataArry = [];
if (localStorage.resultsSubjects != null) {
  dataArry = JSON.parse(localStorage.resultsSubjects);
}
console.log(num);
loadDataSelector();
submit.onclick = function () {
  if ((Name.value != "", Selector.value != "")) {
    let result = {
      Num: num,
      name: Name.value,
      selector: Selector.value,
    };
    if (mode == "create") {
      result.Num += 1;
      num++;
      dataArry.push(result);

      console.log(dataArry);
    } else if (mode == "edit") {
      delete result.Num;
      dataArry[arryIndex] = { ...dataArry[arryIndex], ...result };
      mode = "create";
      submit.innerHTML = "Add";
    }
    localStorage.setItem("resultsSubjects", JSON.stringify(dataArry));
    clearInput();
  } else {
    alert("The fields must not be empty!");
  }
  readData();
};

function loadDataSelector() {
  var options = `<option value="" disabled selected hidden >Teacher</option>`;
  if (teachersOptions) {
    for (let i = 0; i < teachersOptions.length; i++) {
      options += `
        <option >${teachersOptions[i].name}</option>
        `;
    }
  }
  Selector.innerHTML = options;
}

function clearInput() {
  Name.value = "";
  Selector.value = "";
}

function readData() {
  let table = "";
  for (let i = 0; i < dataArry.length; i++) {
    table += `
              <tr class="tr-td">
              <td class="td-Num">${dataArry[i].Num}</td>
              <td class="td-border"></td>
              <td class="td-Name" >${dataArry[i].name} </td>
              <td class="td-border"></td>
              <td class="td-Teacher">${dataArry[i].selector}</td>
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
  localStorage.resultsSubjects = JSON.stringify(dataArry);
  readData();
}

function update(i) {
  Selector.value = dataArry[i].selector;
  Name.value = dataArry[i].name;
  arryIndex = i;
  mode = "edit";
  submit.innerHTML = "update";
}

var searchInput = document.getElementById("searchInput");
var searchMode = "name";
function getSearchMode(id) {
  if (id == "searchNameBtn") {
    searchMode = "name";
  } else if (id == "searchNumBtn") {
    searchMode = "number";
  }

  searchInput.placeholder = "Search by " + searchMode;
}

function search(value) {
  let table = "";
  for (let i = 0; i < dataArry.length; i++) {
    if (searchMode == "name") {
      if (dataArry[i].name.tolowerCase().includes(value.toLowerCase())) {
        table += `
              <tr class="tr-td">
              <td class="td-Num">${dataArry[i].Num}</td>
              <td class="td-border"></td>
              <td class="td-Name">${dataArry[i].name} </td>
              <td class="td-border"></td>
              <td class="td-Teacher">${dataArry[i].selector}</td>
              <td class="td-border"></td>
              <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
              </tr>
        `;
      }
    } else if (searchMode == "number") {
      if (dataArry[i].Num.toString().includes(value)) {
        table += `
              <tr class="tr-td">
              <td class="td-Num">${dataArry[i].Num}</td>
              <td class="td-border"></td>
              <td class="td-Name">${dataArry[i].name} </td>
              <td class="td-border"></td>
              <td class="td-Teacher">${dataArry[i].selector}</td>
              <td class="td-border"></td>
              <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
              </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
