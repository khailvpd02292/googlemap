import SQLite from 'react-native-sqlite-storage';

var db = null;
export default class SqliteHelper {

  static okCallback = () => {
    // console.log('success')
  }

  static errorCallback = (error) => {
    alert('errorCallback: ' + error)
  }

  static openDB() {
     db = SQLite.openDatabase({ name: "db_mapwarning5", location: 1 }, this.okCallback, this.errorCallback);
    return db;
  }

  static createTable = (sql) => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static createTableTitleWaring = () => {
    // return (this.createTable('CREATE TABLE IF NOT EXISTS "TitleWaring" ("IdTitle" INTEGER PRIMARY KEY AUTOINCREMENT,"value"	TEXT NOT NULL UNIQUE,"IconName" BLOB)'));
    return (this.createTable( 'CREATE TABLE IF NOT EXISTS "TitleWaring" ( "value"	TEXT NOT NULL UNIQUE,"IconName"	BLOB,PRIMARY KEY("value"))')

    );
  };
  static createTableMapWarning = () => {
    return this.createTable('CREATE TABLE IF NOT EXISTS "MapWarning" ("IdWarning"	INTEGER PRIMARY KEY AUTOINCREMENT,"time" BLOB,"deviceId" TEXT, "latitude"	REAL,"longitude" REAL,"value"	TEXT,FOREIGN KEY("value") REFERENCES "TitleWaring"("value"))');
  };

  static getTitleWaring = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "SELECT * FROM TitleWaring ORDER BY value ASC";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getImage = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "SELECT MapWarning.value,MapWarning.latitude,MapWarning.longitude,TitleWaring.IconName  FROM MapWarning INNER JOIN TitleWaring ON MapWarning.value=TitleWaring.value";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  static getMapWarningUnique = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "SELECT MapWarning.value,MapWarning.latitude,MapWarning.longitude,TitleWaring.IconName  FROM MapWarning INNER JOIN TitleWaring ON MapWarning.value=TitleWaring.value group by MapWarning.value";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };


  static getMapWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "SELECT * FROM MapWarning ORDER BY value ASC";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  static async addTitleWaring(value, IconName) {
    return await new Promise(function (resolve, reject) {
      db.transaction(tx => {
        console.log('start')
        console.log(value)
        // console.log(IconName)
        var sql = "INSERT INTO TitleWaring (value,IconName) VALUES (?,?)";
        tx.executeSql(sql, [value, IconName], (tx, results) => {
          console.log('add success')
          resolve(results);
        });
      })
    });
  };

  static async addMapWarning(time,deviceId,value,latitude,longitude) {
    return await new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "INSERT INTO MapWarning (time,deviceId,value,latitude,longitude) VALUES (?,?,?,?,?)";
        tx.executeSql(sql, [time,deviceId,value,latitude,longitude], (tx, results) => {
          resolve(results);
        });
      })
    });
  };
  static async query(sql) {
    return await new Promise(function (resolve, reject) {
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
}