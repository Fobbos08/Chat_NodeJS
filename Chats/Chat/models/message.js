/**
 * Created by Эмиль on 15.03.2015.
 */
var _login="";
var _message="";
exports.setMessageData = function(login, message){
    if(login!= undefined)   _login = login;
    if(message!=undefined)  _message = message;
};
exports.getLogin = function(){
    return _login;
};
exports.getMessage = function(){
    return _message;
};