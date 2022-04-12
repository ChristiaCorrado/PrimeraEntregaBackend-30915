const fs = require("fs");

class Carrito {
  constructor(id, products) {
    this.id = id;
    this.products = products;
    this.timestamp = Date.now();
  }

  async createDataCart(e) {
    try {
      await fs.promises.writeFile("./data/carrito.txt", JSON.stringify(e));
      console.log("nuevo archivo creado");
    } catch (err) {}
  }

  async getAllCarts() {
    try {
      const data = JSON.parse(
        await fs.promises.readFile("./data/carrito.txt", "utf-8")
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async saveCart(nuevoCarrito) {
    try {
      const data = await this.getAllCarts();

      if(data.length == 0){
        const cartBuyer = {
          id: 1,
          cart: nuevoCarrito,
        };
        data.push(cartBuyer);
      }else{
        const lastIndex = data.length - 1;
        console.log(data[lastIndex].id);
        let newid = parseInt(data[lastIndex].id);
        newid++;
        const cartBuyer = {
          id: newid,
          cart: nuevoCarrito,
        };
        data.push(cartBuyer);

      }
      
      await fs.promises.writeFile("data/carrito.txt", JSON.stringify(data,null,2));

      return data;
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteCartById(id) {
    try {
      const dataCarts = await this.getAllCarts();
      const eliminatedCart = dataCarts.find((cart) => {return cart.id === id} );
      if (!eliminatedCart) {
        console.log( "El carrito no existe");
      }
      const cartsFiltered = dataCarts.filter((cart) => cart.id !== id);
      await fs.promises.writeFile(
        "data/carrito.txt",
        JSON.stringify(cartsFiltered, null, 2)
      );
      return console.log("Carrito eliminado", eliminatedCart);
    } catch (error) {
      return console.log("Error al eliminar el Carrito", error.message);
    }
  }

  async addProductToCartById(id, product) {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === id);
      if (cartIndex === -1) {
        return console.log(true, "El carrito no existe", null);
      }
      const cartAux = carts[cartIndex];
      console.log(cartAux);
      const aproduct = cartAux.cart
      const cartUpdate = [...aproduct, product ]      
      cartAux.cart = cartUpdate
      
      carts[cartIndex] = cartAux;
      console.log(carts[cartIndex]);

      await fs.promises.writeFile(
        "data/carrito.txt",
        JSON.stringify(carts,null, 2)
      );
      return console.log(false, "Producto agregado al carrito", carts[cartIndex]);
    } catch (error) {
      return console.log(
        
        "Error al agregar el producto al carrito",
        error.message
      );
    }
  }

  async deleteProductCartById(idCart, idProduct) {
    try {
      const allCarts = await this.getAllCarts();
      const cartIndex = allCarts.findIndex((cart) => {return cart.id == idCart});
      if (cartIndex === -1) {
        return console.log("El carrito no existe");
      }
      const cartAux = allCarts[cartIndex];
      console.log(cartAux);
      console.log(idCart, idProduct);
      if (!cartAux.cart.find((product) => product.id == idProduct)) {
        return console.log("El producto no existe");
      }
      cartAux.cart = cartAux.cart.filter((p) => p.id !== idProduct);
      
      allCarts[cartIndex] = cartAux;
      
       await fs.promises.writeFile(
         "data/carrito.txt",
         JSON.stringify(allCarts, null, 2)
      );
      return  allCarts[cartIndex];
    } catch (error) {
      return console.log(
        
        "Error al eliminar el producto del carrito",
        error.message
      );
    }
  }

  async getById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((cart) => cart.id === id);

      if (cart) {
        return cart;
      } else {
        return console.log("Carrito no encontrado");
      }
    } catch (error) {
      return console.log("Error al obtener el Carrito", null);
    }
  }

}

module.exports = Carrito;
