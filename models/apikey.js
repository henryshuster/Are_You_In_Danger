var fs = require("fs");
var creds = require('./key_generate.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1C2JPb-2UZQjnnBXxZXb_j4nHOuL-Ld_2G0R9dQTTucs');

class user{
  constructor(email,key,password){
    this.email = email;
    this.key = key;
    this.password = password;

}}
exports.generateKey = function(user,callback){
  var key = new byte[32];
  var generator= RandomNumberGenerator.Create();
      generator.GetBytes(key);

    user.key = Convert.ToBase64String(key);

    console.log("returning user object with key added");
    //return;
    callback(user);
}


exports.checkKey = function(user, callback){
  var r = {};
    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].key.trim());
      console.log(user.key.trim());
        if(rows[i].key == user.key && rows[i].mail == user.mail && rows[i].password == user.password){
          r = new user(user.mail,user.key);

        }
    }
     if(isEmpty(r)){
      console.log("keydoesnotexist");
      callback(null);
    }else
		 callback(r);
});
}



exports.updateUser = function(user,callback){
      var udata = Object.values(user);
      console.log(user.password);
      console.log("updating user csv with these values:" + udata);

      if(udata.key == null){ //need test to see if they exist
        console.log("adding a new row to the csv because its a new user");
        exports.addRow(1,user,function(){
          		 if (callback) {
          			callback();
          		}
                  console.log("new row has been added to csv that does not have key, please generate key and re run function");
                  //return;
          });
      }

      else{
          exports.rows(function(rows){
              for(var i = 0; i <rows.length; i++){ //check to see if this needs to be -1

                  if(rows[i].key.trim() == udata[1].trim() && rows[i].password.trim() == udata[2].trim()){
					                   console.log(rows[i]);


                                rows[i].key = user.key;
                                rows[i].password = user.password;
                                rows[i].email = user.email;

					            rows[i].save();
				 if (callback) {
					callback();
				}

                  }
              }

      });
    }

}
exports.login = function(ur,callback){
//  var user_file = fs.readFileSync('data/users.csv','utf8');
//  var rows = user_file.split('\n');
//  var rows = doc.getRows(1);
exports.rows(function(rows){
  var user = {};

  for(var i = 0; i <rows.length; i++){
      if(rows[i].email.trim() == ur.email.trim() && rows[i].password == ur.password){
        user.email = ur.email;
        user.password = ur.password;
        user.key = ur.key;
      //  return(user);
      }
  }

  if(isEmpty(user)){
      console.log("user does not exist");
      callback(null);
  }else
    callback(user);
  });
}
