const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session); 


const options = {
    host: 'localhost',
    user: 'root', 
    database: 'iubatcpc', 
    password: '', 
}

let sessionConnection = mysql.createConnection(options);
let sessionStore = new mysqlStore({
    expiration: 10000000,
    createDatabaseTable: true,
    schema:{
        tableName: 'sessiontbl',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }

},sessionConnection);


let sessionInt = ()=>{
    return session({
        key: 'Auth',
        secret:'my secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,     
    })
}

module.exports = sessionInt;