const fs = require('fs');

//sql import
const { options } = require("../dataBase/options/mariaDB");

const knex = require("knex")(options);


class Productos{

    constructor(id, title, description, stock, price, thumbnail) {
        this.title = title;
        this.price = parseFloat(price);
        this.description = description;
        this.stock = parseInt(stock);
        this.thumbnail = thumbnail;
        this.id = id;
        this.timestamp = Date.now();
      }

      async getAll() {
        try{
          let productObtenidos = await this.readProducts
          console.log(productObtenidos);
          const suport = []
          
          productObtenidos.forEach(elem => {
            if(elem.title != " ")
            suport.push(elem)
          });
          
          return suport
        } catch (error) {
          return console.log( `hay error ${error.message}`)
        }
      }

      async saveNewProduct(newProduct){
        try {
          const data = await this.getAll()
          const lastIndex = data.length-1
          console.log(data[lastIndex].id);
          let newid = parseInt(data[lastIndex].id)
          newid++
          newProduct.id = newid
          this.addProductosSQL(newProduct)
        }catch (error){
          console.log(error);

        }
      }

      async getById(id) {
        try {
          const products = await this.getAll();
          const indexProduct = products.findIndex((product) => product.id == id);
          if (indexProduct === -1) {
            return console.log(`producto no encontrado`);
          }
          else{
            const productFiltered = []
            productFiltered.push(products[indexProduct])
            return productFiltered
          }
        } catch (error) {
          return console.log( "Error al obtener el producto");
        }
      }
      
      async deleteById(id) {
        try {
            
          const limpiarProducto = {
            title : " ",
            price :" " ,
            description : " ",
            stock : " ",
            thumbnail : " ",
            timestamp : Date.now(),

          }

          this.actualizarById(id, limpiarProducto)
          
        } catch (error) {
          console.log(error.message);;
        }
      }

      async deleteAll() {
        try {
          await fs.promises.writeFile("../data/productos.txt", "[]");
    
          return returnMessage(false, "Productos eliminados", null);
        } catch (error) {
          return returnMessage(true, "Error al eliminar los productos", null);
        }
      }

      async actualizarById(id, newProduct) {
        try {
          const products = await this.getAll();

          const indexProduct = products.findIndex((product) => product.id == id);
          if (indexProduct === -1) {
            return console.log(`producto no encontrado`);
          }
          const productToBeUpdated = products[indexProduct];
    
          if (newProduct.title) {
            productToBeUpdated.title = newProduct.title;
          }
          if (newProduct.description) {
            productToBeUpdated.description = newProduct.description;
          }
          if (newProduct.stock) {
            productToBeUpdated.stock = parseInt(newProduct.stock);
          }
          if (newProduct.price) {
            productToBeUpdated.price = parseFloat(newProduct.price);
          }
          if (newProduct.thumbnail) {
            productToBeUpdated.thumbnail = newProduct.thumbnail;
          }
    
          products[indexProduct] = productToBeUpdated;
    
          await fs.promises.writeFile('./data/productos.txt', JSON.stringify(products));

          console.log(`producto actualizado correctamente`);

        } catch (error) {
         console.log(`error en actualizar producto ${error.message}`);
        }
      }

      //sql

    

      addProductosSQL = (data) => {
        knex('productos').insert(data).then(()=>{
          console.log(`productos agregados a sqlite3`);
        }).catch( (err) =>{
          console.log(`error en iniciar tabla ${err.message}`);
        })
      }

      readProducts = () => {
        knex('productos').select('*').then((data) => {
          
          let productosDB = this.baseJsonProductos(data)
          
          return productosDB

        }).catch( (err) =>{
          console.log(`error en iniciar tabla ${err.message}`);
        })
      }

      async crearTablaProducto()  {

        try {
            const tablaProductos = await knex.schema.hasTable('productos')
            if (tablaProductos) {
                console.log(`La tabla productos ya se encuentra creada`);
            }
            else {
                await knex.schema.createTable('productos', (table) =>{
                    table.increments('id'),
                    table.string('title', 200).notNullable(),
                    table.float('price').notNullable(),
                    table.string('description',200).notNullable(),
                    table.timestamp('timestamp')
                    table.string('thumbnail',200).notNullable(),
                    table.integer('stock').notNullable()
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

      baseJsonProductos = (data) => {
        let allProductsSQL= {
          id : this.id,
          title : this.title,
          timestamp : this.timestamp,
          price : this.price,
          stock : this.stock,
          description : this.description
        }

        for (let registro of data) {
            
          allProductsSQL.id = registro.id
          allProductsSQL.title = registro.title
          allProductsSQL.timestamp = registro.timestamp
          allProductsSQL.price = registro.price
          allProductsSQL.stock = registro.stock
          allProductsSQL.description = registro.description
          }
          return allProductsSQL;
      }

    

    

}

module.exports = Productos