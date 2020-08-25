
function myAlert(message) { // כניסה 1
  alert(message);
}


function welcomeUser(WhoamI) { // כניסה 3
  if (WhoamI.role_id == 1) {
    console.log("i am admin");
    $("#main").html(
      `
    <div class="alert alert-danger" role="alert"><h1>Welcome Jerry, You are Admin</h1>
   <table class="table table-hover">
   <thead>
     <tr>
       <th scope="col">#</th>
       <th scope="col">UserName</th>
       <th scope="col">PIN</th>
       <th scope="col">Roleid</th>
     </tr>
   </thead>
   <tbody>
     <tr>
     <th scope="row">1</th>
     <td>${username.value}</td>
     <td>${username.value}</td>
     <td>${username.value}<td>
     
     </tr>
     <tr>
       <th scope="row">2</th>
       <td>${username.value}</td>
       <td>${username.value}</td>
       <td>${username.value}<td>
      
     </tr>
     <tr>
       <th scope="row">3</th>
       <td>${username.value}</td>
       <td>${username.value}</td>
       <td>${username.value}<td>
       
     </tr>
   </tbody>
 </table>
 <button type="button" class="btn btn-light">Edit</button>
 <button type="button" class="btn btn-danger">Cancel</button>
 
   `)

  } else {
    if (WhoamI.role_id == 2) {
      console.log("i am manager");
      main.innerHTML = ` 
       <h1 class="category">Welcome, you are Manager</h1> 
       <button>Edit</button>
       
   
       `
    } else {
      console.log("i am salesman");
      main.innerHTML = `
       <h1 class="category">Welcome, you are salesman</h1> 
       <button>Edit</button>
       
       
       `
    }

  }
}
export { myAlert, welcomeUser }