function CallAjax(settings, Callback) { // 
    $.ajax(settings) // תקרא לשרת עם אובייקט סטינגס 
    .done((data) => { // תחזיר את המידע שהתקבל במשתנה מידע
        Callback(data,settings); // קורא חזרה עם פרמטרים מידע וסטינגס
        }).fail((err) => { // אם יש טעות זה נכנס לפה
            console.log('There is an error: ' + err);
        });
}

export {CallAjax} // לְיַצֵא