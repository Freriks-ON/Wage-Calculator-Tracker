var Pays = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO Pays(companyName,reviewDate,HoursWorked,rateofpay) VALUES(?, ?, ?, ?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE friend SET name=?, fullName=?, dob=?, isFriend=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    },
    deleteOne: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM Pays WHERE id = ?";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Pays ORDER BY reviewDate DESC ;";
        tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    },
    selectOne: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Pays WHERE id = ?;";
        tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    }
};
var Company = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO Companys(name) VALUES(?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM Companys;";
        tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    }
};