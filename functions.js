module.exports = {
  scrutinize: (req, res, next) => {
    // First name min length 3
    if (!req.query.type) {
      return res.status(400).send({
        message: 'Please select leave type'
      });
    }
    // Last name min length 3
    if (!req.query.lastname || req.query.lastname.length < 3) {
      return res.status(400).send({
        message: 'Please enter a lastname/surname with min. 3 chars'
      });
    }

    // Email validation
    if (!req.query.email || func.validateEmail(req.query.email) === false) {
      return res.status(400).send({
        message: 'Please enter a valid email address'
      });
    }
    // password min 6 chars
    if (!req.query.password || req.query.password.length < 8) {
      return res.status(400).send({
        message: 'Please enter a password with min. 6 chars'
      });
    }
    next();
  },

  arrangeOutput : (data) => {

  var users = [];

  var newUser = (users, userData) =>{
    var addUser = {id: userData.uid, name: userData.name, requests: []};

    delete userData.uid; delete userData.name;
    
    if(userData.req_id !== null){addUser.requests.push(userData);}
    users.push(addUser);

    return users;
  }

      for(var i = 0; i < data.length; i++){
        var userData = data[i];
        if(users.length > 0){

          var state = false;
          var pos = 0;

          for(var j = 0; j < users.length; j++){
            if(users[j].id === userData.uid){
              state = true; pos = j; break;
            }
          }

          if(!state){
            users = newUser(users, userData);
          }

          else{
          delete userData.uid; delete userData.name;
          if(userData.req_id !== null){users[pos].requests.push(userData);}

          }

        }

        else{
          users = newUser(users, userData);
        }
        
      }

    return users;
  },

  dateDiff : (first, second) => {
    // Date should be in the order of day/month/year
      function parseDate(str) {
          var mdy = str.split('/');
          return new Date(mdy[2], mdy[1] - 1, mdy[0]);
      }

     return Math.round((parseDate(second)-parseDate(first))/(1000*60*60*24));
  }
}