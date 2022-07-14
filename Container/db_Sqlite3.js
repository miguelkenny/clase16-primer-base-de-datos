const knexSqlite3 = require('knex');
const path = require('path');

const configSQLite3 = {
    client: 'sqlite3',
    connection: {
        filename: (path.join(__dirname, '../DB/db_sqlite3'))
    },
    useNullAsDefault: true
}

const dbSqlite = knexSqlite3(configSQLite3)

module.exports = dbSqlite