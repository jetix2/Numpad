

function CallAjax(settings, callback) { // 
    $.ajax(settings) //
        .done((data) => { //
            callback(data); // קורא חזרה עם פרמטרים של מידע וסטינגס
        })
        .fail((err) => { // אם יש טעות זה נכנס לפה
            console.log(err);
        });
}



export {CallAjax}
