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
            url: "https://js-final-project-o-3eba29.appdrag.site/api/loguser",
            data: {
                username: username,
                PIN: code
            },
            method: "POST"
        }
        Model.CallAjax(settings, postlogin); // קוראה לסטנגס ועושה פוסט לוגין

    }

    var code = ''

    function addToCode(digit) {
        getRandomColor(numpad)
        setCode(code + digit)
        if (code.length === 4) {
            login()
        }
    }
    function setCode(newCode) {
        code = newCode
        document.getElementById('code').textContent = code;
    }

    function showNumpad() {
        numpad.style.display = ""
        window.addEventListener('keydown', function (event) {
            if (event.which >= 48 && event.which <= 57) {
                addToCode(event.which - 48)
            }

            if (event.which === 8)
                setCode(code.substr(0, code.length - 1))
        })
    }
        function postlogin(data/* , settings */) { // אחרי כוללאזאקס מביא לי את הנתונים ואת כל הפרמטרים כדי להתחבר לשרת
            if (data.affectedRows == 1) { // אם המשתנה של שינוי טבלה ברשת נעשה שווה ל1 אז תכנס
                View.welcomeUser();
                //getInfo(settings.data.username); // תלך לשרת ותביא לי את כל הנתונים החדשים
            } else { // אם בשרת זה לא שינה תכנס לכאן
                alert("Wrong Cradentials"); // רשמת צירוף נתונים לא נכון
               
            }
        }


        function getRandomColor() {
            var letters = '0123456789';
            var color = '#';
            for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
            }

