'use strict';

// set to the true if we have ran installed before.
var installed = true; 


module.exports = function (app) {



  if (!installed) {
    var User = app.models.Account;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;


    User.create([
      {username: 'admin',
       email: 'admin@gmail.com',
       password: 'password',
       nom: 'Toan',
       prenom: 'Nguyen Dinh'},
       {username: 'user',
       email: 'user@gmail.com',
       password: 'password',
       nom: 'Toan',
       prenom: 'Nguyen Dinh'}
    ], function (err, users) {
      if (err) throw err;


      console.log("Created User: ", users);
      //create the admin role
      Role.create({
        name: 'administrator'
      }, function (err, role) {
        if (err) throw err;

        //make bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function (err, principal) {
          console.log('Created principal:', principal);

          // now it should be fine :)
        });
      });
    });
  }


};