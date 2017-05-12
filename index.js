var tran = require('./lib/mysql-tran.js');

module.exports = {
    executeTransaction: tran.execTran
}