 var bcrypt= require("bcrypt-nodejs");
 
 var SALT_FACTOR =10;
 
 bcrypt.genSalt(SALT_FACTOR,function(err,salt){
       
       bcrypt.hash("yashodha",salt,null,function(err,hash){
            
            console.log(hash);
        });
    });