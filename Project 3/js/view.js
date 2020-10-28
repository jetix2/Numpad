import * as controller from "./controller.js"; // לְיַבֵּא מ

var forms = document.getElementById("form");
var arr;
var y = "";
var index;
var $main = $('#main');
var $numpad = $("#numpad");
var toAppend = "";
var counter = 0;

function buildUserTable(WhoamI) {
  index = WhoamI.Role;
  $numpad.toggle(100);
  if (WhoamI.Role == 1) {
    y = "Admin";
    alldata(index, WhoamI, y);
  } else {
    if (WhoamI.Role == 2) {
      y = "Manager";
      alldata(index, WhoamI, y);
    } else {
      y = "Salesman";
      alldata(index, WhoamI, y);
    }
  }
}

function alldata(index, WhoamI, y) {
$(function () {
    $.ajax({
      type: 'GET',
      url: 'https://js-final-project-o-3eba29.appdrag.site/api/getinfo?Role=' + index,
      success: function (main) {
        arr = main.Table;
        toAppend = `
            <div class="alert alert-dark" role="alert"><h1>Welcome ${WhoamI.FirstName}! you are <b>${y}</b></h1></div>    
            <table data-id="table" class="table table-hover table-primary"><thead><tr>
            <th scope="col">id</th>
            <th scope="col">username</th>
            <th scope="col">FirstName</th>
            <th scope="col">Pass_Code</th>
            <th scope="col">Role</th>
            <th scope="col">Buttons</th></tr></thead><tbody>`;
        arr.forEach(function (data, i) {
          if ((i + 1) == 1) { // באינטרקציה הראשונה לא מוסיף את ה איקס
            if (index == 3) {
              data = WhoamI;
              arr = WhoamI;
            }
            toAppend += `
          <tr id="row${data.username}">
          <th scope="row">${i+1}</th>
          <td><input id="username${data.username}" class="btn btn-light username" value="${data.username}"></td>
          <td><input class="btn btn-light firstName" value="${data.FirstName}"></td>
          <td><input class="btn btn-light Pass_Code" value="${data.Pass_Code}"></td>     
          <td>${data.Role}</td>
          <td><button id="Update${data.username}" class="btn btn-outline-light">Update</button></td>
          </tr>`;
          } else { // באינטרקציות הבאות כן להוסיף את האיקס ו
            if (index != 3) {
              var add = 0;
              fillTable(data, i,add);
            }
          }
          counter++;
        });
        toAppend += `</tbody></table>`;
        if (y == "Admin" || y == "Manager") {
           forms.style.display = ""
         }
        $main.html(toAppend);
        for (let j = 0; j < arr.length; j++) {
          if ((index == 2 && j == 0) || index == 3 || index == 1) {
            document.getElementById("Update" + arr[j].username).addEventListener("click", function () {
            controller.updateUserDB("Update" + arr[j].username)});
          }
          if (j != 0) {
             document.getElementById("delete" + arr[j].username).addEventListener("click", function () {
              controller.deleteU("delete" + arr[j].username)});
          }
        }
      }
    });
  });
  $numpad.toggle(300);
}

document.getElementById("formbutton").addEventListener("click", controller.addU);

function fillTable(data, i,add) {
    i = counter;
    if (add) {
      toAppend += `<table data-id="table" class="table table-hover table-dark"><tbody>`;
    }
    if (index == 1) {
    toAppend += `
    <tr id="row${data.username}">
    <th scope="row">${i+1}</th>
    <td><input id="username${data.username}" class="btn btn-light username" value="${data.username}"></td>
    <td><input class="btn btn-light firstName" value="${data.FirstName}"></td>
    <td><input class="btn btn-light Pass_Code" value="${data.Pass_Code}"></td>
    <td><input class="btn btn-light Role" value="${data.Role}"></td>
    <td><button id="Update${data.username}" class="btn btn-outline-light">Update</button>
    <button id="delete${data.username}" class="btn btn-outline-light">X</button></td>
    </tr>`;
    }
    if (index == 2 || index == 3) {
      toAppend += `
      <tr id="row${data.username}">
      <th scope="row">${i+1}</th>
      <td id="username${data.username}">${data.username}</td>
      <td>${data.FirstName}</td>
      <td>${data.Pass_Code}</td>
      <td>${data.Role}</td>
      <td><button id="delete${data.username}" class="btn btn-outline-light">X</button></td>
      </tr>`;
    }
    if (add) {
      toAppend += `</tbody></table>`;
      $main.html(toAppend);
      if (index == 1) {
        document.getElementById("Update" + data.username).addEventListener("click", function () {
          controller.updateUserDB("Update" + data.username)});
      }
        document.getElementById("delete" + data.username).addEventListener("click", function () {
            controller.deleteU("delete" + data.username)});
    }
  }

function protection(_username, _Role,text) {
  if (text == "update") {
    if (y == "Admin" || y == "Manager") { // בדיקה אם מישהו עבר את הסמכויות 
      if (y == "Manager") {
        if (_Role != 2 || _Role != 3) {
          _Role = 3;
        }
      }
    } else {
      _Role = 3;
    }
  } else {
    if ((text == "add" && y == "Manager") || (text == "add" && y == "Admin") || (text == "delete" && y == "Manager") || (text == "delete" && y == "Admin"))  {
      if (y == "Manager") {
        _Role = 3;
        }
        if (y == "Admin" &&  _Role == 1) {
          _Role = null
        }
    } else {
      _Role = null;
    _username = null;
    }
  }
  return _Role, _username;
}

export {buildUserTable,protection,fillTable} // לְיַצֵא