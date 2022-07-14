class ContenedorProductos{
    constructor(mySql, tableName){
        
        this.mySql = mySql
        this.tableName = tableName

        const mySqlTable = async () => {
            try {
                const exists = await mySql.schema.hasTable(tableName);
                if(!exists) {
                    await mySql.schema.createTable(tableName, prod => {
                        prod.increments('id').primary()
                        prod.string('nombre', 50)
                        prod.float('precio')
                        prod.string('url')
                    })
                }
            } catch (error) {
               console.log(error);
               mySql.destroy() 
            }
            
        }
        mySqlTable()
    }

    async insertProduct(product){
        await this.mySql(this.tableName).insert(product)
    }

    async getAll(){
        let allProducts = await this.mySql.from(this.tableName).select('*')
        return allProducts
    }
}

module.exports = ContenedorProductos