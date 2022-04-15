
class CreadorDeTablas{
    constructor(tablaProductos,tablaOrders,tablaCarrito){

        this.tablaProductos = tablaProductos;
        this.tablaOrders = tablaOrders;
        this.tablaCarrito = tablaCarrito
    }

    async crearTablaProducto()  {

        try {
            const tablaProductos = await knex.schema.hasTable('productos')
            if (tablaProductos) {
                console.log(`La tabla productos ya se encuentra creada`);
            }
            else {
                await knex.schema.createTable('productos', (table) =>{
                    table.increment('id'),
                    table.string('title', 200),
                    table.float('price'),
                    table.string('description',200),
                    table.timestamp('timestamp')
                    table.string('thumbnail',200),
                    table.integer('stock')
                })
                console.log(`La tabla productos fue Creada`)
            }
        }catch (err) {
            console.log(`hay un error en funcion crearTablaProducto ${err.message}`);
        }
    
    }
    
    async  crearTablaOrders(){
        try {
            const tablaOrders = await knex.schema.hasTable('orders');
            if (tablaOrders) {
                console.log(`La tabla carrito ya  fue creada`);
            } else {
    
                await knex.schema.createTable('orders', (table)=>{
                    table.increment('id'),
                    table.string('products', 300),
                    table.timestamp('timestamp')
                })
                console.log(`tabla orders creada`);
            }
        }catch(error){
            console.log(`error en crearTablaOrders ${error.message}`);
    
        }
    }
    
    
    async  crearTablaCarrito(){
        try{
            const tablaCarrito = await knex.schema.hasTable('carrito')
            if (tablaCarrito) {
                console.log(` La tabla Carrito ya fue creada`);
            }else{
                await knex.schema.createTable('carrito', ()=>{
                    table.increment('id'),
                    table.integer('cart',2000),
                    table.timestamp('timestamp')
                })
                console.log(`Tabla carrito creada`)
            }
        }catch(err){
            console.log(`error en crearTablaCarrito ${error.message}`);
        }
    }

    
      
    borrarNulls = () => {
        knex('productos').where('description', null).del()
        .then(() => {console.log(`todo borrado`);})
        .catch( (err) => {console.log(`error ${err.message}`);})
      }
      
    
}



module.exports = CreadorDeTablas
