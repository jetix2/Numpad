import * as View from "./view.js"; // לְיַבֵּא מ
import * as Model from "./model.js"; // לְיַבֵּא מ

var code = ''; // סטרינג למספרים שנקיש
var timer = "";
var num = 0;
var color = '';
var $numpad = $("#numpad");
var $code = $("#code");
var $img = $("#img");
var audioBeep = document.getElementById("audioBeep");

export function init() { // לְיַצֵא
    $img.toggle(100); // תציג
    $("#main").toggle(100); // תציג
    var numpad = document.getElementById("numpad");
    var buttons = numpad.querySelectorAll("button");
    for (const button of buttons) {
        button.onclick = () => {
            addToCode(button.value)
        }
    }
    document.querySelector("button").addEventListener("click", showNumpad);
}

function addToCode(digit) { // פונקציה להוספת נקישה
    audioBeep.play();
    color = document.getElementById("button" + digit).style.backgroundColor = "red"; // צביעה של הלחצן
    setCode(code + digit) // קריאה לפונקציה עם הפרמטר
    if (code.length === 4) { // אם האורך של המספר שווה ל4 כנס
        login(); // בדיקה עם השרת אם הנתונים נכונים
        if (View.buildUserTable) {
            clearInterval(timer) // Timer cleaner
        }
    }
}

function setCode(newCode) { // פונקציה עם פרמטר הנוסף שנלחץ
    code = newCode // תכניס את הפרמטר החדש לקוד
    document.getElementById('code').textContent = code; // הוספה לתצוגה את הקוד החדש
}

function showNumpad() {
    audioBeep.play();
    $numpad.toggle(100);
    wrong();
    document.onkeydown = event => { // אם המספר שהוקש הוא בין 0 ל9 תכנס
        if (event.which >= 48 && event.which <= 57) {
            addToCode(event.which - 48) // תקרא לפונקציה עם פרמטר
            if (View.buildUserTable) {
                clearInterval(timer) // Timer cleaner
            }
            wrong();
        }
        // if (event.which === 8) // קי קוד של מחיקה
        //     setCode(code.substr(0, code.length - 1)) // מוחק ספרה אחת
    };
}

function postlogin(data) { // אחרי כוללאזאקס מביא לי את הנתונים ואת כל הפרמטרים כדי להתחבר לשרת
    if (data.Table.length == 1) { // אם המשתנה של שינוי טבלה ברשת נעשה שווה ל1 אז תכנס
        document.getElementById("audioSuccess").play();
        $numpad.toggle(100); // תסתיר את המקשים
        $img.toggle(100);
        clearInterval(timer); // Timer cleaner                
        $code.empty();
        code = ""
        clearcolor(); // מחיקת הצבע מהכפתורים
        document.onkeydown = null; 
        View.buildUserTable(data.Table[0]);
    } else { // אם בשרת זה לא שינה תכנס לכאן
        document.getElementById("audioLongError").play();
        alert("Wrong Cradentials"); // רשמת צירוף נתונים לא נכון
        num++;
        if (num == 3) {
            document.getElementById("audioPolice").play();
            alert("The police are coming!!");
        }
        $code.empty();
        code = ""
        wrong()
        clearcolor() // מחיקת הצבע מהכפתורים
        clearInterval(timer); // Timer cleaner                                      
    }
}

function wrong() { //
    clearInterval(timer); // Timer cleaner                             
    timer = setInterval(function () { // מהתחלה מחדש          
        document.getElementById("audioShortError").play();
        console.log("times up")
        $code.empty();
        code = ""
        clearcolor() // מחיקת הצבע מהכפתורים
    }, 3000);
}

function clearcolor() { // מחיקת הצבע מהכפתורים
    for (let i = 0; i < 10; i++) {
        color = document.getElementById("button" + i).style.backgroundColor = "white";
    }
}

function login() {
    var username = document.querySelector("#username").value;
    const settings = {
        url: "https://js-final-project-o-3eba29.appdrag.site/api/loginuser",
        data: {
            username: username,
            Pass_Code: code
        },
        method: "POST"
    }
    Model.CallAjax(settings, postlogin); // קוראה לסטנגס ועושה פוסט לוגין
}

async function updateUserDB(btn) {
    var button = document.getElementById(btn)
    var row = button.parentElement.parentElement
    var _username = row.querySelector(".username").value; // NEW
    var _Pass_Code = row.querySelector(".Pass_Code").value; // Old
    var _FirstName = row.querySelector(".firstName").value;
    //var _Role = row.querySelector(".Role").value;
    var x = confirm("Are you sure you want to update?");
    if (x == true) {
        var _newUsername = btn.slice(6) // Old
        var text = "update";
        View.protection(_username,text);
        var equal = false; 
        if (_username == _newUsername) {
            equal = true; // זה אומר שהוא לא שינה את היוזר נאימ שלו
            _newUsername = _username;
        }
        var verify = true;
        if (equal == false) { // אם או שינה את היוזר נאימ שלו אז תכנס ותבדוק שלא קיים פעמיים
            verify = await UserVerify(_username); // בדיקה עם קיים כבר שם כזה במערכת
        }
        if (verify == false) { // אם הבדיקה יצא שקר אז כנס לפה 
            alert("Username already exists")
        } else {
            var settings = {
                url: "https://js-final-project-o-3eba29.appdrag.site/api/updateusers",
                data: {
                    username: _username, // NEW
                    Pass_Code: _Pass_Code,
                    FirstName: _FirstName,
                    newUsername: _newUsername // Old
                },
                method: "POST"
            }
            Model.CallAjax(settings, updateUser); // קוראה לסטנגס ועושה פוסט לוגין
            function updateUser(data, settings) {
                if (data.affectedRows == 1) {
                    alert("Update successfully!");
                } else {
                    alert("There is an error");
                }
            }
        }
    } else {}
}

async function addU() { // זה בעצם טופס
    var _username = document.getElementById("formUsername").value;
    var _FirstName = document.getElementById("formFName").value;
    var _Pass_Code = document.getElementById("formPass_Code").value;
    var _Role = document.getElementById("formRole").value;
    var verify = await UserVerify(_username); // בדיקה עם קיים כבר שם כזה במערכת
    if (verify === false) {
        alert("Username already exists")
    } else {
        var text = "add";
        View.protection(_username,_Role,text);
        var settings = {
            url: "https://js-final-project-o-3eba29.appdrag.site/api/adduser",
            data: {
                username: _username,
                FirstName: _FirstName,
                Pass_Code: _Pass_Code,
                Role: _Role
            },
            method: "POST"
        }
        Model.CallAjax(settings, addUser); // קוראה לסטנגס ועושה פוסט לוגין
        function addUser(data, settings) {
            if (data.affectedRows == 1) {
                alert("Create a new user successfully!");
                var add = 1;
                var i = 0;
                data = settings.data;
                View.fillTable(data, i,add);
            } else {
                alert("There is an error");
            }
        }
        document.getElementById("formUsername").value = "";
        document.getElementById("formFName").value = "";
        document.getElementById("formPass_Code").value = "";
    }
}

async function UserVerify(username) {
    var returnVal = false;
    var verify = await verifyUsername(username)
    if (verify == 0) {
        returnVal = true;
    }
    return returnVal;
}

async function verifyUsername(username) { // בודק אם קיים כבר שם משתמש כזה
    var verify = "";
    var settings = {
        url: "https://js-final-project-o-3eba29.appdrag.site/api/verifyuser",
        data: {
            username: username
        },
        method: "POST"
    };
    await $.ajax(settings).done(function (response) {
        verify = response.Table.length;
    });
    return verify;
}

function deleteU(btn) {
    var button = document.getElementById(btn)
    var row = button.parentElement.parentElement
    var _username = row.querySelector(".username").value
    var x = confirm("Are you sure you want to delete ?");
    if (x == true) {
         var text = "delete";
         View.protection(_username,text);
        const settings = {
            url: "https://js-final-project-o-3eba29.appdrag.site/api/deleteuser",
            data: {
                username: _username
            },
            method: "DELETE"
        }
        Model.CallAjax(settings, deleteUser); // קוראה לסטנגס ועושה פוסט לוגין 
        function deleteUser(data, settings) {
            if (data.affectedRows == 1) {
                document.getElementById("row" + settings.data.username).remove();
                alert("User deleted!");
            } else {
                alert("There is an error");
            }
        }
    } else {}
}

export {showNumpad,clearcolor,wrong,postlogin,setCode,addToCode,login,deleteU,updateUserDB,addU} // לְיַצֵא