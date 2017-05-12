/*This's a test file for mysql transaction*/
var mySqlTran = require('../lib/mysql-tran.js');
var mysql = require('mysql');
var expect = require('chai').expect;

describe('execute transaction test with pool connection', function () {
    var pool = mysql.createPool({
        host: 'input your mysql host',
        port: 3306,
        user: 'input your mysql user',
        password: 'input your mysql db password',
        database: 'database name',
        debug: false,
        connectionLimit: 1000
    });

    it('It should be return connection ok', function (done) {
        pool.getConnection(function (errr, connection) {
            var entities = [];
            var entity1 = {
                sql: "insert into `test` set ?",
                params: { name: "sirius1", age: 18 }
            }
            var entity2 = {
                sql: "update `test` set `age` = ? where `name` = ?",
                params: [16, "sirius1"]
            }
            entities.push(entity1);
            entities.push(entity2);
            mySqlTran.execTran(connection, entities, function (err, msg) {
                expect(msg).to.be.ok;
                done();
            })
        })
    })
})

describe('execute transaction test with native connection', function () {
    var connection = mysql.createConnection({
        host: 'input your mysql host',
        port: 3306,
        user: 'input your mysql user',
        password: 'input your mysql db password',
        database: 'database name',
        debug: false,
        connectionLimit: 1000
    });

    it('It should be return connection ok', function (done) {
        var entities = [];
        var entity1 = {
            sql: "insert into `test` set ?",
            params: { name: "sirius2", age: 18 }
        }
        var entity2 = {
            sql: "update `test` set `age` = ? where `name` = ?",
            params: [19, "sirius2"]
        }
        entities.push(entity1);
        entities.push(entity2);
        mySqlTran.execTran(connection, entities, function (err, msg) {
            expect(msg).to.be.ok;
            done();
        })
    })
})