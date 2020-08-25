import * as View from "./view.js";
import * as Model from "./model.js";
export function init() {
    var numpad = document.getElementById("numpad")
    var buttons = numpad.querySelectorAll("button");
    
    numpad.style.display = "none"

    for (const button of buttons) {
        button.onclick = () => { addToCode(button.value) }

    }
    document.querySelector("button").addEventListener("click", showNumpad);
    
}

function login() {
    var username = document.querySelector("#username").value;
    var settings = {
        url: "https://js-final-project-o-3eba29.appdrag.site/api/getadmin",
        data: {
            username: username,
            PIN: code,
        },
        method: "POST"
    }
    Model.CallAjax(settings, postlogin); // קוראה לסטנגס ועושה פוסט לוגין

}


var code = ''
var timer = ""
var color = ""
var num = 0

function addToCode(digit) {
   color = document.getElementById(digit).style.backgroundColor = "red";
    setCode(code + digit)
    if (code.length === 4) {
        login()
        if (View.welcomeUser) {
            clearInterval(timer)
        }
    }

}
function setCode(newCode) {
    code = newCode
    document.getElementById('code').textContent = code;

}

function showNumpad() {
    
    numpad.style.display = ""
    timer = setInterval(function()
{console.log("times up0")
$("#code").empty();
code = ""
clearcolor()


}, 3000);

    window.addEventListener('keydown', function (event) {
        if (event.which >= 48 && event.which <= 57) {
            addToCode(event.which - 48)
            
            
            if (View.welcomeUser) {
                clearInterval(timer)
            }
            wrong()
        }



        if (event.which === 8)
            setCode(code.substr(0, code.length - 1))
        
        
        
     
    })
}



function postlogin(data) { // אחרי כוללאזאקס מביא לי את הנתונים ואת כל הפרמטרים כדי להתחבר לשרת
    if (data.Table.length == 1) { // אם המשתנה של שינוי טבלה ברשת נעשה שווה ל1 אז תכנס
        View.welcomeUser(data.Table[0]);
        numpad.style.display = "none"
        $("#code").empty();
            code = ""
    } else { // אם בשרת זה לא שינה תכנס לכאן
        num++;
        if (num == 3) {
            alert("The police are coming!!");
            // שומעים צליל משטרה
        }
        alert("Wrong Cradentials"); // רשמת צירוף נתונים לא נכון
        $("#code").empty();
        code = ""
        wrong()
        clearcolor()
        

    }
}


function wrong() {
    clearInterval(timer);
    timer = setInterval(function () {
        console.log("times up3")
        $("#code").empty();
        code = ""
        clearcolor()
    }, 3000);
}

function clearcolor(){
    color = document.getElementById("1").style.backgroundColor = "white";
    color = document.getElementById("2").style.backgroundColor = "white";
    color = document.getElementById("3").style.backgroundColor = "white";
    color = document.getElementById("4").style.backgroundColor = "white";
    color = document.getElementById("5").style.backgroundColor = "white";
    color = document.getElementById("6").style.backgroundColor = "white";
    color = document.getElementById("7").style.backgroundColor = "white";
    color = document.getElementById("8").style.backgroundColor = "white";
    color = document.getElementById("9").style.backgroundColor = "white";
    color = document.getElementById("0").style.backgroundColor = "white";
}
