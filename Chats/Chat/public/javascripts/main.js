/**
 * Created by Эмиль on 20.04.2015.
 */
setTimeout(update,1000);
setInterval(getCounter, 1000);

$(document).ready(function() {
    $('#messageForm').bind('submit', function(e){
        e.preventDefault();
        $.ajax({
            url:'/sendMessage',
            method:'POST',
            data: $(this).serialize(),
            success: function(data){

            },
            error: function(){
                alert('error');
            }
        });
    });
});

function update(){
    $.get('/views/messages.ejs', function (template) {
        var func = ejs.compile(template);
        var lastDate;
        if($(".message").length>0) {
            lastDate = $(".message").last()[0].attributes.date.value;
        }
        var date = new Date();
        var time = date.getTime();
        $.ajax({
            url: "http://localhost:3000/messages",
            data: {
                //date: lastDate
            },
            dataType: 'json',
            type: "get",
            success: function (data) {
                var date2 = new Date();
                var time2 = date2.getTime();
                $("#timeWithDB").html(time2-time);
                var insertHtml = func(data);
                $('.messages').html(insertHtml);
            },
            error: function (data) {
                alert("error");
            }
        });
        setTimeout(update,1000);
    });
}

function getCounter()
{
    var date = new Date();
    var time = date.getTime();
    $.ajax({
        url: "http://localhost:3000/publiccounter",
        data: {
            //date: lastDate
        },
        dataType: 'json',
        type: "get",
        success: function (data) {
            var date2 = new Date();
            var time2 = date2.getTime();
            $("#time").html(time2-time);
            $("#count").html(data.count);
        },
        error: function (data) {
            alert("error");
        }
    });
}