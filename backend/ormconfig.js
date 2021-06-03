module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": process.env.BD_PORT,
  "username": process.env.BD_USERNAME,
  "password": process.env.BD_PASSWORD,
  "database": process.env.BD_DATABASE,
  "entities": [
      "./src/models/*.ts"
  ],
  "migrations": [
      "./src/database/migrations/*.ts"
  ],
  "cli": {
      "migrationsDir": "./src/database/migrations"
  }
}
