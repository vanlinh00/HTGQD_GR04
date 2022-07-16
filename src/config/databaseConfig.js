var mysql =require("mysql");

var connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'htgqdnhom4'
});

connection.connect(function(err, connection){
   if(err){console.log("net noi databae khong thanh cong")}else{console.log("ket noi thanh cong")};
});

module.exports=connection;