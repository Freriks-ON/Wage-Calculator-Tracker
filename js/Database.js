var A3DB;

function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
} 

var DB = {
    createDatabase: function(){
        var shortName= "Company";
        var version = "1.0";
        var displayName = "DB for Company app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        A3DB = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database created successfully.");
        }
    },
    createTables: function(){

        function txFunction(tx) {
        	function successCreate(){
                console.info("Success: Create table: friend successful.");
            }
            var sql = "DROP TABLE IF EXISTS Company;";
            tx.executeSql(sql,options,successCreate,errorHandler);
        	console.info("Creating table: Company");
        	 var sql1 = "CREATE TABLE IF NOT EXISTS Companys("+
             "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
            "name VARCHAR(40) NOT NULL);";

            function callback() {
            console.info("Success: Company Added");
            }
            tx.executeSql(sql1,options,successCreate, errorHandler);
            console.info("Creating table: Pays");
            var sql = "CREATE TABLE IF NOT EXISTS Pays(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "companyName VARCHAR(30) NOT NULL," +
                "reviewDate DATE," +
                "HoursWorked VARCHAR(5),"+
                "rateofpay VARCHAR(5));";
                // "FOREIGN KEY(typeId) REFERENCES type(id));";

            var options = [];



            tx.executeSql(sql, options, successCreate, errorHandler);


        }
        function successTransaction(){
            console.info("Success: Create tables transaction successful");
        }
        A3DB.transaction(txFunction, errorHandler, successTransaction );
    },
    dropTables: function(){
        
        function txFunction(tx){
            var sql = "DROP TABLE IF EXISTS type;";
            var options = [];
            
            function successDrop() {
                console.info("Success: friend table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler );
        }
        
        function successTransaction(){
            console.info("Success: Drop tables transaction successful");
        }
        
        A3DB.transaction(txFunction, errorHandler, successTransaction);
    }

};