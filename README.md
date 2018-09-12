# mysql-tran

easier to execute transaction of node.js mysql.

## Install
```sh
$ npm install mysql-tran --save
```
mysql-tran based on [mysqljs/mysql][]

[mysqljs/mysql]: https://github.com/mysqljs/mysql

## Introduction

This is a simple plugin for MySQL to make transactions easier to use, and is 100% MIT licensed.

Here is an example on how to use it:
```js
var mysql = require('mysql');
var mysqlTran = require('mysql-tran');

var connection = mysql.createConnection({
    host: 'host',
    port: 3306,
    user: 'me',
    password: 'pwd',
    database: 'db',
    debug: false,
    connectionLimit: 1000
})

var dataEntities = [
    {
        sql: "insert into `test` set ?",
        params: { name: "sirius1", age: 18 }
    },
    {
        sql: "update `test` set `age` = ? where `name` = ?",
        params: [16, "sirius1"]
    }
];

mysqlTran.executeTransaction(connection, dataEntities, function (err, msg) {
    if (err) {
        console.error(err);
    }
    console.log(JSON.stringify(msg));
})
```

And you could use mysql pool connection:
```js
var mysql = require('mysql');
var mysqlTran = require('mysql-tran');

var pool = mysql.createPool({
    host: 'host',
    port: 3306,
    user: 'me',
    password: 'pwd',
    database: 'db',
    debug: false,
    connectionLimit: 1000
})

var dataEntities = [
    {
        sql: "insert into `test` set ?",
        params: { name: "sirius1", age: 18 }
    },
    {
        sql: "update `test` set `age` = ? where `name` = ?",
        params: [16, "sirius1"]
    },
    //...more sql-tran entities
];

pool.getConnection(function(poolError, connection){
    mysqlTran.executeTransaction(connection, dataEntities, function (err, msg) {
        if (err) {
            console.error(err);
        }
        console.log(JSON.stringify(msg));
    })
})
```
## Running tests
```sh
$ npm test
```
