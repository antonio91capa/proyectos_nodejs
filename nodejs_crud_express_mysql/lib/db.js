var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'ec2-35-173-94-156.compute-1.amazonaws.com',
    user: 'hugrhhmhwcblqf',
    password: '5cc6208d51bbe29aca49be4cbe06bba690a1768e2f95594f853091244c5a0df0',
    database: 'dfq14jsfgl36fh'
    //port:'5432'
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected..!');
    }
});

module.exports = connection;