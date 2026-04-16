const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(process.cwd(), '../data/sales.db');

export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
    });

    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
      db.close();
    });
  });
};
