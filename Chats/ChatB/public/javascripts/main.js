/**
 * Created by Эмиль on 20.04.2015.
 */
var timeout = 200;
var length = 7;
var l=7;
setTimeout(send, timeout);
setInterval(updateValues, 500);

function updateValues(){
    if ($("#time")[0].value != "")
    {
        if ($("#time")[0].value > 0)
        {
            timeout = parseInt($("#time")[0].value);
        }
    }
    if ($("#messageLength")[0].value != "")
    {
        if ($("#messageLength")[0].value > 0)
        {
            length = $("#messageLength")[0].value;
        }
    }
    l = parseInt(length);
    l+=2;
}

function send(){
    setTimeout(send, timeout);
    $.ajax({
        url:'http://localhost:3000/sendMessage',
        method:'POST',
        data: {
        login:Math.random().toString(36).substring(2,l),
        message:Math.random().toString(36).substring(2,l)
        },
        success: function(data){
        },
        error: function(){
            alert('error');
        }
    });
    return;
}