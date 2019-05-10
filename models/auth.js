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




exports.authUser = function(user, callback){
  var r = {};
    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
  //    console.log(rows[i].key.trim());
  //    console.log(user.key.trim());
        if(rows[i].email == user.email && rows[i].password == user.password){
          r = new user(user.mail,user.password);

        }
    }
     if(isEmpty(r)){
      console.log("user does not exist");
      callback(false);
    }else
		 callback(true);
});
}



exports.saveData = function(user,callback){

          exports.rows(function(rows){
              for(var i = 0; i <rows.length; i++){ //check to see if this needs to be -1

                  if(rows[i].email == user.email){
					                   console.log(rows[i]);
                                rows[i].datasave = user.datasave;
					            rows[i].save();
				 if (callback) {
					callback();
				}

                  }
              }

      });
    }

}

  if(isEmpty(user)){
      console.log("user does not exist");
      callback(false);
  }else
    callback(true);
  });
}
