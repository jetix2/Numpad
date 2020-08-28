// ---------------------------------- פועל 3 ---------------------------------------------
import * as Model from "./model.js"; // לְיַבֵּא מ

function myAlert(message) { 
  alert(message);
}


function welcomeUser(WhoamI) {
  var index = WhoamI.role_id
  var y = ""
  if (WhoamI.role_id == 1) {
    y = "Admin"
    alldata(index, WhoamI, y);
  } else {
    if (WhoamI.role_id == 2) {
      y = "Manager"
      alldata(index, WhoamI, y);
    } else {
      y = "Salesman"
      alldata(index, WhoamI, y);
/*       var $a = $('#A');
      $a.style.display = "none" // תסתיר */
      button.style.display = "none" // תסתיר

    }
  }
}


function alldata(index, WhoamI, y) {
  //username.style.display = "none" // תסתיר
  //button.style.display = "none" // תסתיר
  $(function () {
    var $main = $('#main');
    $.ajax({
      type: 'GET',
      url: 'https://js-final-project-o-3eba29.appdrag.site/api/getroles?role_id=' + index,
      success: function (main) {
        var arr = main.Table;
        var toAppend = `<div class="alert alert-primary" role="alert"><h1>Welcome ${WhoamI.fName}! you are <b>${y}</b></h1></div>
                
          <table class="table table-hover table-info">
          <thead>
            <tr>
            <th scope="col">id</th>
            <th scope="col">username</th>
            <th scope="col">FirstName</th>
            <th scope="col">Pass_Code</th>
            <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>`;
        arr.forEach(function (data, i) {
          toAppend += `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data.username}</td>
                  <td>${data.fName}</td>
                  <td>${data.PIN}</td>
                  <td>${data.role_id}</td>
                  </tr>
                 `;
        });
        toAppend += ` 
        </tbody>
          </table>
          <button id="ED" class="btn btn-outline-dark">Edit</button>
          <button id="C"  class="btn btn-outline-dark">Cancel</button>
          <button id="U"  class="btn btn-outline-dark">Update</button>
          <button id="D"  class="btn btn-outline-dark">delete</button>`
        $main.html(toAppend);
        var edit = document.querySelector("#ED").addEventListener("click",Edit)
      }
    });
  });
}
function Edit(i, WhoamI,y) {
console.log("edit mode")
code.style.display = "none"
main.innerHTML = 
`<div class="alert alert-primary" role="alert"><h1>Welcome ${WhoamI}! you are <b>${y}</b></h1></div>
                
          <table class="table table-hover table-info">
          <thead>
            <tr>
            <th scope="col">id</th>
            <th scope="col">username</th>
            <th scope="col">FirstName</th>
            <th scope="col">Pass_Code</th>
            <th scope="col">Role</th>
            </tr>

            <tr>
                  <th scope="row">${i}</th>
                  <td><input id="username" class="btn btn-light" placeholder="Username"></td>
                  <td><input id="fName" class="btn btn-light" placeholder="first name"></td>
                  <td><input id=PINCODE" type=password class="btn btn-light" placeholder="PINCODE"></td>
                  <td><input id="role_id" class="btn btn-light" placeholder="role"></td>
                  </tr>
          </thead>
          <tbody>
          </tbody>
          </table>
          <button id="ED" class="btn btn-outline-dark">Edit</button>
          <button id="C"  class="btn btn-outline-dark">Cancel</button>
          <button id="U"  class="btn btn-outline-dark">Update</button>
          <button id="D"  class="btn btn-outline-dark">delete</button>`
  
}



export {myAlert,welcomeUser} // לְיַצֵא