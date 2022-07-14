const express = require('express')
const fs = require('fs')
const { Server: IOServer } = require('socket.io')
const path = require('path')
const app = express()
const port = 8080
const serverExpress = app.listen(port, () => console.log(`Servidor escuchando puerto ${port}`))
const io = new IOServer(serverExpress)

const dbMySql = require('../Container/db_MySql')
const dbSqlite = require('../Container/db_Sqlite3')

const contenedorProductos = require('../Container/containerProducts')
const products = new contenedorProductos(dbMySql, 'producto')

const contenedorMensajes = require('../Container/containerMessage')
const mensajes = new contenedorMensajes(dbSqlite, 'mensajes')

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async socket => {
    console.log('New Connection!!!', socket.id);

    const prod = await products.getAll()
    let messages = await mensajes.getMessages()

    io.emit('server:products', prod)
    io.emit('server:message', messages)

    socket.on('server:products', async productsInfo => {

        products.insertProduct(productsInfo)

        const prod = await products.getAll()
        io.emit('server:products', prod)

    })

    socket.on('client:message', async messageInfo => {
        const date = new Date(Date.now()).toLocaleString().replace(',', '');
        messageInfo.date = date

        /* messages.push(messageInfo) */

        mensajes.insertMessage(messageInfo)
        let messages = await mensajes.getMessages()

        io.emit('server:message', messages)
    })
})