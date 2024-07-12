var Name = document.getElementById("Name");
var birthdate = document.getElementById("Birthdate");
var selector = document.getElementById("inputSelector");
var address = document.getElementById("Address");
var submit = document.getElementById("submit");
var searchInput = document.getElementById("searchInput");




const classOption = JSON.parse(localStorage.getItem("classesResult"));

console.log(classOption)

loadDataSelector();
var imgUrl = "";

var mode = "create";

var dataArry = [];
if (localStorage.resultsStudents != null) {
  dataArry = JSON.parse(localStorage.resultsStudents);
} else {
  dataArry = [];
}
var num = numCounter(localStorage.getItem("resultsStudents"));
var arryIndex;

console.log(num);
submit.onclick = function () {
  
  if ((Name.value != "", birthdate != "", selector != "", address != "", imgUrl != "")) {
    let result = {
      Num: num,
      name: Name.value,
      Birthdate: birthdate.value,
      Selector: selector.value,
      Address: address.value,
      Img: imgUrl,
    };
    if (mode == "create") {
      result.Num += 1;
      num++;
      dataArry.push(result);
    } else if (mode == "edit") {
      delete result.Num;
      dataArry[arryIndex] = {...dataArry[arryIndex], ...result};
      mode = "create";
      submit.innerHTML = "Add";
    }
    localStorage.setItem("resultsStudents", JSON.stringify(dataArry));
    clearInput();
  } else {
    alert("Filed or the profile picture must not be empty!");
  }
  readData();
};
function clearInput() {
  Name.value = "";
  birthdate.value = "";
  selector.value = "";
  Address.value = "";
  showImg.src = "icons/plus-icon.png";
  showImg.style.width = "20%";
  showImg.style.height = "20%";
  imgText.style.display = "block";
}

function datePlaceholder() {
  if (birthdate.value == "") {
    birthdate.style.color = "rgba(0,0,0,0.5";
  } else if (birthdate.value != "") {
    birthdate.style.color = "rgb(0,0,0)";
  }
}

function loadDataSelector() {
  var options = `<option value="" disabled selected hidden >Class</option>`;
  if (classOption) {
    for (let i = 0; i < classOption.length; i++) {
      options += `
        <option>${classOption[i].name}</option>
        `;
    }
  }
  
  selector.innerHTML = options;
}


birthdate.onblur = datePlaceholder;
birthdate.onfocus = function () {
  birthdate.style.color = "rgb(0,0,0)";
};

function readData() {
  let table = "";
  for (let i = 0; i < dataArry.length; i++) {
    table += `
        <tr>
                <td class="td-Pfp"><img src="${dataArry[i].Img}" alt="" onmouseenter="imgPreview(this.src)" onmouseleave="stopImgPreview()"></td>
                <td class="td-border"></td>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].Birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Class">${dataArry[i].Selector}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].Address}</td>
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
  localStorage.resultsStudents = JSON.stringify(dataArry);
  readData();
}

function update(i) {
  submit.innerHTML = "edit";
  mode = "edit";
  Name.value = dataArry[i].name;
  birthdate.value = dataArry[i].Birthdate;
  selector.value = dataArry[i].Selector;
  address.value = dataArry[i].Address;
  showImg.src = dataArry[i].Img;
  imgUrl = dataArry[i].Img;
  showImg.style.width = "100%";
  showImg.style.height = "100%";
  imgText.style.display = "none";
  arryIndex = i;
  datePlaceholder();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

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
      if (dataArry[i].name.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
                <td class="td-Pfp"><img src="${
                  dataArry[i].Img
                }" alt="" onmouseenter="${imgPreview(dataArry[i].Img)}" ></td>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].Birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Class">${dataArry[i].Selector}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].Address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>`;
      }
    } else if (searchMode == "number") {
      if (dataArry[i].Num.toString().includes(value)) {
        table += `<tr>
                <td class="td-Pfp"><img src="${dataArry[i].Img}" alt=""></td>
                <td class="td-border></td>
                <td class="td-Num">${dataArry[i].Num}</td>
                <td class="td-border"></td>
                <td class="td-Name">${dataArry[i].name}</td>
                <td class="td-border"></td>
                <td class="td-Birthdate">${dataArry[i].Birthdate}</td>
                <td class="td-border"></td>
                <td class="td-Class">${dataArry[i].Selector}</td>
                <td class="td-border"></td>
                <td class="td-Address">${dataArry[i].Address}</td>
                <td class="td-border"></td>
                <td class="td-Delete-and-Edit"><button onclick="deleteData(${i})">Delete</button> <button onclick="update(${i})">Edit</button></td>
        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

var imgPath = document.getElementById("inputFileImg");
var showImg = document.getElementById("showImg");
var imgText = document.getElementById("imgText");
const reader = new FileReader();

imgPath.onchange = function () {
  reader.addEventListener(
    "load",
    function () {
      imgUrl = reader.result;
      showImg.src = reader.result;
      showImg.style.width = "100%";
      showImg.style.height = "100%";
      imgText.style.display = "none";
    },
    false
  );

  if (imgPath) {
    reader.readAsDataURL(imgPath.files[0]);
  }
};

function imgPreview(i) {
  showImg.src = i;
  showImg.style.width = "100%";
  showImg.style.height = "100%";
  imgText.style.display = "none";
}

function stopImgPreview() {
  showImg.src = "icons/plus-icon.png";
  showImg.style.width = "20%";
  showImg.style.height = "20%";
  imgText.style.display = "block";
}
