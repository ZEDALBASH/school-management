var inputName = document.getElementById("inputName");
var selectorStudents = document.getElementById("selectorStudents");
var selectorSubject = document.getElementById("selectorSubject");
var submit = document.getElementById("submit");
var searchInput = document.getElementById("searchInput");
var mode = "create";
const studentsOption = JSON.parse(localStorage.getItem("resultsStudents"));
const subjectOption = JSON.parse(localStorage.getItem("resultsSubjects"));

var searchMode = "name";
loadDataSubjectSelec();
loadDataStudentSelec();

var num = numCounter(localStorage.getItem("marksResult"));

var dataArry = [];
if (localStorage.marksResult != null) {
  dataArry = JSON.parse(localStorage.marksResult);
}
var arryIndex;
submit.onclick = function () {
  if (
    (inputName != "", selectorStudents.value != "", selectorSubject.value != "")
  ) {
    let result = {
      Num: num,
      Name: inputName.value,
      SelectorStudents: selectorStudents.value,
      SelectorSubject: selectorSubject.value,
    };

    if (mode == "create") {
      result.Num += 1;
      num++;
      dataArry.push(result);
    } else if (mode == "edit") { 
      delete result.Num;
      dataArry[arryIndex] = {...dataArry[arryIndex], ...result};
      mode == "create";
      submit.innerHTML == "create";
    }

    localStorage.setItem("marksResult", JSON.stringify(dataArry));
  } else {
    alert("Fileds must not be empty!");
  }
  readData();
  clearInput();
};
readData();
function clearInput() {
  inputName.value = "";
  selectorStudents.value = "";
  selectorSubject.value = "";
}

function readData() {
  let table = "";
  for (let i = 0; i < dataArry.length; i++) {
    table += `
            <tr class="tr-td">
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Student">${dataArry[i].SelectorStudents}</td>
                <td class="td-border"></td>
                <td class="td-Mark" style='color:${
                  dataArry[i].Name > 49 ? "green" : "red"
                };'>${dataArry[i].Name}</td>
                <td class="td-border"></td>
                <td class="td-subject">${dataArry[i].SelectorSubject}</td>
                <td class="td-border"></td>
                <td class="td-Status" style="color:${
                  dataArry[i].Name > 49 ? "green" : "red"
                };">${dataArry[i].Name > 49 ? "Passed" : "Failed"}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
            </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = table;
}

function deleteData(i) {
  dataArry.splice(i, 1);
  localStorage.resultsSubjects = JSON.stringify(dataArry);
  readData();
}

function update(i) {
  selectorSubject.value = dataArry[i].SelectorSubject;
  selectorStudents.value = dataArry[i].SelectorStudents;
  inputName.value = dataArry[i].Name;
  arryIndex = i;
  mode = "edit";
  submit.innerHTML = "Update";
}

function loadDataStudentSelec() {
  let options = `<option value="" selected hidden disabled >Student</option>`;
  if (studentsOption) {
    for (let i = 0; i < studentsOption.length; i++) {
      options += `
          <option>${studentsOption[i].name}</option>
          `;
    }
  }

  selectorStudents.innerHTML = options;
}

function loadDataSubjectSelec() {
  let options = `<option value="" selected hidden disabled >Subject</option>`;
  if (subjectOption) {
    for (let i = 0; i < subjectOption.length; i++) {
      options += `
        <option>${subjectOption[i].name}</option>
        `;
    }
  }

  selectorSubject.innerHTML = options;
}


function getSearchMode(id) {
  if (id == "searchNumBtn") {
    searchMode = "number";
  } else if (id == "searchNameBtn") {
    searchMode = "name";
  }

  searchInput.placeholder = "Search by " + searchMode;
}

function search(value) {
  let tables = "";
  for (let i = 0; i < dataArry.length; i++) {
    if (searchMode == "name") {
      if (dataArry[i].SelectorStudents.toLowerCase().includes(value.toLowerCase())){
        tables += `
            <tr class="tr-td">
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Student">${dataArry[i].SelectorStudents}</td>
                <td class="td-border"></td>
                <td class="td-Mark" style='color:${
                  dataArry[i].Name > 49 ? "green" : "red"
                };'>${dataArry[i].Name}</td>
                <td class="td-border"></td>
                <td class="td-subject">${dataArry[i].SelectorSubject}</td>
                <td class="td-border"></td>
                <td class="td-Status" style="color:${
                  dataArry[i].Name > 49 ? "green" : "red"
                };">${dataArry[i].Name > 49 ? "Passed" : "Failed"}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
            </tr>
        `;

      }
    }
    else if (searchMode == "number") {
      if (dataArry[i].Num.toString().includes(value)) {
        tables += `
            <tr>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Student">${dataArry[i].SelectorStudents}</td>
                <td class="td-border"></td>
                <td class="td-Mark" style='color:${
                  dataArry[i].Name > 49 ? "green" : "red"
                };'>${dataArry[i].Name}</td>
                <td class="td-border"></td>
                <td class="td-subject">${dataArry[i].SelectorSubject}</td>
                <td class="td-border"></td>
                <td class="td-Status" style="color:${
                  dataArry[i].Name > 49 ? "green" : "red"
                };">${dataArry[i].Name > 49 ? "Passed" : "Failed"}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
            </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tables;
}
