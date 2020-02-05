import SQLite from 'react-native-sqlite-storage';

var db = null;
export default class SqliteHelper {

  static okCallback = () => {
    // console.log('success')
  }

  static errorCallback = (error) => {
    alert('errorCallback: ' +  error)
  }

  static openDB() {
    db = SQLite.openDatabase({name: "dulieu4", createFromLocation: "~data/mapwarning.db"}, this.okCallback, this.errorCallback);
    return db;
  }

  static getWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM mapwarning";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getTitle = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT DISTINCT value FROM mapwarning ORDER BY value ASC";
        // console.log('completed')
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };

  static getTitleWarning = () => {
    return new Promise(function (resolve, reject) {
      db.transaction( tx => {
        var sql = "SELECT * FROM warning ORDER BY value ASC";
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
      });
    });
  };
  static async addWarning(value,latitude,longitude)  {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO mapwarning (value,latitude,longitude) VALUES (?,?,?)";
        tx.executeSql(sql, [value,latitude,longitude], (tx, results) => {
          resolve(results);
        });
      })
    });
  };

  static async addTitleWarning(value)  {
    return await new Promise(function (resolve, reject){
      db.transaction(tx => {
        var sql = "INSERT INTO warning (value) VALUES (?)";
        console.log('success')
        tx.executeSql(sql, [value], (tx, results) => {
          resolve(results);
        });
      })
    });
  };
  // static async deleteTitle(a)  {
  //   return await new Promise(function (resolve, reject){
  //     db.transaction(tx => {
        
  //       var sql = "DELETE FROM warning WHERE value='"+a+"'";
  //       console.log('success')
  //       console.log('value: '+a)
  //       tx.executeSql(sql, [value], (tx, results) => {
  //         resolve(results);
  //       });
  //     })
  //   });
  // };

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