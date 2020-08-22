


function CallAjax(settings, Callback) { // 
    $.ajax(settings) //
        .done((data) => { //
            Callback(data, settings); // קורא חזרה עם פרמטרים של מידע וסטינגס
        })
        .fail((err) => { // אם יש טעות זה נכנס לפה
            console.log(err);
        });
}

export {CallAjax}