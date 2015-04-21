/**
 * Created by Эмиль on 20.04.2015.
 */
setInterval(send, 200);

function send(){
    $.ajax({
        url:'http://localhost:3000/sendMessage',
        method:'POST',
        data: {
        login:Math.random().toString(36).substring(7),
        message:Math.random().toString(36).substring(7)
        },
        success: function(data){
        },
        error: function(){
            alert('error');
        }
    });
}