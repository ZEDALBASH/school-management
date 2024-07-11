var Name = document.getElementById("NameInput");
var submit = document.getElementById("submit");
var searchInput = document.getElementById("searchInput");
var num = (function () {
  const results = localStorage.getItem("classesResult");

  try {
    let parseResults = JSON.parse(results);

    if (!parseResults || !Array.isArray(parseResults) || !parseResults.length) {
      throw new Error("is not array");
    }
    debugger;
    return Math.max(...parseResults.map((item) => item.Num));
    debugger;
  } catch (err) {
    console.log(err);
    return 0;
  }
})();

var dataArry = [];
if (localStorage.classesResult != null) {
  dataArry = JSON.parse(localStorage.classesResult);
}

var mode = "create";
var arryIndex;
submit.onclick = function () {
  if (Name.value != "") {
    let result = {
      Num: num,
      name: Name.value,
    };
    if (mode == "create") {
      result.Num += 1;
      num++;
      dataArry.push(result);
    } else if (mode == "edit") {
      delete result.Num;
      dataArry[arryIndex] = { ...dataArry[arryIndex], ...result };
      mode = "create";
      submit.innerHTML = "Add";
    }

    localStorage.setItem("classesResult", JSON.stringify(dataArry));
  } else {
    alert("Filed must not be empty!");
  }
  readData();
  clearInput();
};
console.log(dataArry);

function clearInput() {
  Name.value = "";
}

function deleteData(i) {
  dataArry.splice(i, 1);
  localStorage.classesResult = JSON.stringify(dataArry);
  readData();
}
function update(i) {
  Name.value = dataArry[i].name;
  submit.innerHTML = "Update";
  mode = "edit";
  arryIndex = i;
}
readData();
function readData() {
  let table = "";
  for (let i = 0; i < dataArry.length; i++) {
    table += `<tr>
                  <td class="td-Num">${dataArry[i].Num}</td>
                  <td class="td-border"></td>
                  <td class="td-name">${dataArry[i].name}</td>
                  <td class="td-border"></td>
                  <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
                </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
}

var searchMode = "name";
function getSearchMode(id) {
  if (id == "nameSearchBtn") {
    searchMode = "name";
  } else if (id == "numSearchBtn") {
    searchMode = "number";
  }
  console.log(searchMode);
  searchInput.placeholder = "Search by " + searchMode;
}

function search(value) {
  let table = "";
  for (let i = 0; i < dataArry.length; i++) {
    if (searchMode == "name") {
      if (dataArry[i].name.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
                  <td class="td-Num">${dataArry[i].Num}</td>
                  <td class="td-border"></td>
                  <td class="td-name">${dataArry[i].name}</td>
                  <td class="td-border"></td>
                  <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
                </tr>`;
      }
    } else if (searchMode == "number") {
      if (dataArry[i].Num.toString().includes(value)) {
        table += `<tr>
                  <td class="td-Num">${dataArry[i].Num}</td>
                  <td class="td-border"></td>
                  <td class="td-name">${dataArry[i].name}</td>
                  <td class="td-border"></td>
                  <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
                </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
