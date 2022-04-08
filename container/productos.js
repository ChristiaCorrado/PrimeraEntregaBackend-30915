const fs = require('fs');

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
        try {
          const data = await fs.promises.readFile("../data/productos.txt", "utf-8");
          const products = JSON.parse(data);
    
          return returnMessage(false, "Productos encontrados", products);
        } catch (error) {
          return returnMessage(true, "Error al obtener los productos", null);
        }
      }

      async getById(id) {
        try {
          const products = (await this.getAll()).payload;
          const product = products.find((product) => product.id === id);
    
          if (product) {
            return returnMessage(false, "Producto encontrado", product);
          } else {
            return returnMessage(true, "Producto no encontrado", null);
          }
        } catch (error) {
          return returnMessage(true, "Error al obtener el producto", null);
        }
      }
      
      async deleteById(id) {
        try {
          const products = (await this.getAll()).payload;
          const eliminatedProduct = products.find((product) => product.id === id);
          if (!eliminatedProduct) {
            return returnMessage(true, "Producto no encontrado", null);
          }
          const productsFiltered = products.filter((product) => product.id !== id);
          await this.deleteImage(eliminatedProduct.thumbnail);
          await fs.promises.writeFile(
            "../data/productos.txt",
            JSON.stringify(productsFiltered, null, 2)
          );
    
          return returnMessage(false, "Producto eliminado", eliminatedProduct);
        } catch (error) {
          return returnMessage(true, "Error al eliminar el producto", null);
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
          const products = (await this.getAll()).payload;
          const indexProduct = products.findIndex((product) => product.id === id);
          if (indexProduct === -1) {
            return returnMessage(true, "Producto no encontrado", null);
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
            await this.deleteImage(productToBeUpdated.thumbnail);
            productToBeUpdated.thumbnail = newProduct.thumbnail;
          }
    
          products[indexProduct] = productToBeUpdated;
    
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
          return returnMessage(
            false,
            "Producto actualizado",
            productToBeUpdated
          );
        } catch (error) {
          return returnMessage(true, "Error al actualizar el producto", null);
        }
      }
}

module.exports = Productos