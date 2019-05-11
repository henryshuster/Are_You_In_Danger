var fs = require("fs");
var creds = require('./auth_server.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1ynHS-cI7CNc1-nS9P306amzWnwC4ndOs7AdilLDxfFY');

class user{
  constructor(email,password, key){
    this.email = email;
    this.password = password;

}}

exports.addRow = function(index,newrow,callback){
  doc.useServiceAccountAuth(creds, function (err) {
    console.log("row to be added:" +JSON.stringify(newrow));

    doc.addRow(index,newrow, function (err, rows) {

    });
		if (callback) {
			callback();
		}
  });
}

exports.createUser = function(user, callback){

}

exports.createUser = function(user,callback){
    console.log("User created: "+user.email);
      createRow(user, function(){
          callback(true);});
}

var createRow = function(user_data, callback) {
  console.log("Data.createRow")
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.addRow(1, user_data, function(){
      callback();
    });
  });
}

exports.getUser = function(user, callback) {
  var u = {email: "", password: ""}
  var all_users = loadGoogle(1, function(all_users) {
    for(var i=0; i<all_users.length; i++){
      if(all_users[i].email==user.email){
        u = all_users[i];
        break;
      }
    }
    console.log("Users.getUser, got user "+JSON.stringify(u));
    callback(u);
  });
}

var loadGoogle = function(filename, callback) {
  console.log("data.loadGoogle START")
  var user_data = [];
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(filename, function (err, rows) {
      callback(rows);
    });
  });
}


exports.saveData = function(user,callback){
  exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){ //check to see if this needs to be -1
      if(rows[i].email == user.email){
			     
           rows[i].datasave = user.datasave;
           console.log("TESTING BRAWNER" + rows[i]);
					 rows[i].save();
          if(callback)
              callback();
		
      }
    }
 
  });
}


exports.rows = function(callback){
  doc.useServiceAccountAuth(creds, function (err) {

    var rows = doc.getRows(1, function (err, rows) {

    //  console.log(rows);

   		if (callback) {
			callback(rows);
		}
    });

  });
}

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}


exports.updateUser = function(user, savedData, callback) { //takes in username, an array of userdata in standard order, callback function and updates user with username if found with userdata
  console.log("Updating user: "+user.email);
  exports.getUser(user, function(retrievedUser){
    updatedData=[user.email,retrievedUser.password, JSON.stringify(savedData)];
    console.log(updatedData);
    updateRow(0, user.email, updatedData, function(){
    });
  });
}

var updateRow=function(filename, user_id, updatedData, callback){
  console.log("Data.js updateRow starting");
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[filename];
      sheet.getCells({
        'min-col': 1,
        'max-col': 1,
        'return-empty': true}, function(err, cells) {
        for(var i=0; i<cells.length;i++){
          if(cells[i].value==user_id){
            sheet.getCells({'min-row': i+1,'max-row': i+1},
            function(err, cells) {
              for(var i=0; i<cells.length;i++){
                console.log(updatedData[i]);
                cells[i].setValue(updatedData[i]);
              }
            });
            break;
          }
        }
        callback();
      });
    });
  });
}
