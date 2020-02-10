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
    // db = SQLite.openDatabase({ name: "dulieu4", createFromLocation: "~data/mapwarning.db" }, this.okCallback, this.errorCallback);
    db = SQLite.openDatabase({ name: "db_mapwarning6", location: 1 }, this.okCallback, this.errorCallback);
    return db;
  }

  static createTableWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = 'CREATE TABLE IF NOT EXISTS "warning" ("value"	TEXT NOT NULL UNIQUE)';
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  static createTableMapWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = 'CREATE TABLE IF NOT EXISTS "mapwarning" ("value"	TEXT NOT NULL, "latitude"	REAL,"longitude" REAL,"image" BLOB,"id"	INTEGER PRIMARY KEY AUTOINCREMENT,FOREIGN KEY("value") REFERENCES "warning"("value"))';
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "SELECT * FROM mapwarning";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getTitle = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "SELECT DISTINCT value FROM mapwarning ORDER BY value ASC";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getTitleWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "SELECT * FROM warning ORDER BY value ASC";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  static async addWarning(value, latitude, longitude,image) {
    return await new Promise(function (resolve, reject) {
      db.transaction(tx => {
        console.log('start')
        var sql = "INSERT INTO mapwarning (value,latitude,longitude,image) VALUES (?,?,?)";
        tx.executeSql(sql, [value, latitude, longitude,image], (tx, results) => {
          console.log('add success')
          resolve(results);
        });
      })
    });
  };

  static async addTitleWarning(value) {
    return await new Promise(function (resolve, reject) {
      db.transaction(tx => {
        var sql = "INSERT INTO warning (value) VALUES (?)";
        tx.executeSql(sql, [value], (tx, results) => {
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