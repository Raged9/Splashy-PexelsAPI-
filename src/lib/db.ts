import Database from 'better-sqlite3';

const db = new Database('photography.db', { verbose: console.log });

const initDb = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      photographer TEXT NOT NULL, 
      description TEXT,
      width INTEGER,
      height INTEGER,
      imageUrl TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.exec(createTableQuery);
};

initDb();

export default db;