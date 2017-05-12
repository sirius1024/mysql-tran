var async = require('async');

module.exports = {
    /**
     * execute mysql transaction
     * @param connection pool connection object or native mysql connection
     * @param data entity collections
     */
    execTran: function (connection, sqlData, callback) {
        connection.beginTransaction(function (err) {
            if (err) {
                return callback(err, null);
            }
            var funcAry = [];
            sqlData.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                throw tErr;
                            });
                        } else {
                            return cb(null, 'ok');
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        if (connection.release) {
                            connection.release();
                        }
                        return callback(err, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        if (err) {
                            connection.rollback(function () {
                                if (connection.release) {
                                    connection.release();
                                }
                                return callback(err, null);
                            });
                        } else {
                            if (connection.release) {
                                connection.release();
                            }
                            return callback(null, info);
                        }
                    })
                }
            })
        });
    }
}