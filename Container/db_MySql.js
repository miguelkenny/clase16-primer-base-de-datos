const knexMySql = require('knex')

const configMysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
}

const dbMySql = knexMySql(configMysql)

module.exports = dbMySql