class ContenedorMensajes{
    constructor(sqlite3, tableName) {

        this.sqlite3 = sqlite3
        this.tableName = tableName

        const dbSqlite3 = async () => {
            try {
                const exists = await sqlite3.schema.hasTable(tableName);
                if (!exists) {
                    await sqlite3.schema.createTable(tableName, message => {
                        message.string('email')
                        message.string('message')
                        message.string('date')
                    })
                }
            } catch (error) {
                console.log(error);
                sqlite3.destroy()
            }

        }
        dbSqlite3()
    }

    async insertMessage(message) {
        await this.sqlite3(this.tableName).insert(message)
    }

    async getMessages(){
        let allMessages = await this.sqlite3.from(this.tableName).select('*')
        return allMessages
    }
}

module.exports = ContenedorMensajes