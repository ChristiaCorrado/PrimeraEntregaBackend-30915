const fs = require("fs");

class Carrito {
  constructor(id, products) {
    this.id = id;
    this.products = products;
    this.timestamp = Date.now();
  }

  async createDataCart(e) {
    try {
      await fs.promises.writeFile("../data/carrito.txt", JSON.stringify(e));
      console.log("nuevo archivo creado");
    } catch (err) {}
  }

  async getAllCarts() {
    try {
      const data = await fs.promises.readFile("../data/carrito.txt", "utf-8");
      console.log(data);
      const products = JSON.parse(data);

      return products
    } catch (error) {
      console.log(error);
    }
  }
  
  async saveCart(cart) {
    try {
  
      const allCarts = await this.getAllCarts(); 
      const idcCart = allCarts ? allCarts[allCarts.length - 1].id + 1 : 1;
      const newCart = {
          'id': idcCart,
          'cart': cart
      }
      console.log(newCart);
      allCarts.push(newCart);
      await fs.promises.writeFile("../data/carrito.txt", JSON.stringify(allCarts));

      return allCarts;
    } catch (error) {
      return console.log(error)
    }
  }

  async deleteCartById(id) {
    try {
      const carts = await this.getAll();
      const eliminatedCart = carts.find((cart) => cart.id === id);
      if (!eliminatedCart) {
        return returnMessage(true, "El carrito no existe", null);
      }
      const cartsFiltered = carts.filter((cart) => cart.id !== id);
      await fs.promises.writeFile(
        "../data/carrito.txt",
        JSON.stringify(cartsFiltered, null, 2)
      );
      return returnMessage(false, "Carrito eliminado", eliminatedCart);
    } catch (error) {
      return returnMessage(true, "Error al eliminar el Carrito", null);
    }
  }

  async addProductToCartById(id, product) {
    try {
      const carts = await this.getAll();
      const cartIndex = carts.findIndex((cart) => cart.id === id);
      if (cartIndex === -1) {
        return returnMessage(true, "El carrito no existe", null);
      }
      const cart = carts[cartIndex];
      cart.products = [...cart.products, ...product];
      carts[cartIndex] = cart;
      await fs.promises.writeFile("../data/carrito.txt", JSON.stringify(carts, null, 2));
      return returnMessage(false, "Producto agregado al carrito", cart);
    } catch (error) {
      return returnMessage(
        true,
        "Error al agregar el producto al carrito",
        null
      );
    }
  }

  async deleteProductCartById(idCart, idProduct) {
    try {
      const carts = await this.getAll();
      const cartIndex = carts.findIndex((cart) => cart.id === idCart);
      if (cartIndex === -1) {
        return returnMessage(true, "El carrito no existe", null);
      }
      const cart = carts[cartIndex]
      console.log(idCart,idProduct)
      if (!cart.products.find((product) => product.id === idProduct)) {
        return returnMessage(true, "El producto no existe", null);
      }
      cart.products = cart.products.filter((p) => p.id !== idProduct);
      carts[cartIndex] = cart;
      await fs.promises.writeFile(
        "../data/carrito.txt",
        JSON.stringify(carts, null, 2)
      );
      return returnMessage(false, "Producto eliminado del carrito", cart);
    } catch (error) {
      return returnMessage(
        true,
        "Error al eliminar el producto del carrito",
        null
      );
    }
  }

  async getById(id) {
    try {
      const carts = await this.getAll();
      const cart = carts.find((cart) => cart.id === id);

      if (cart) {
        return returnMessage(false, "Carrito encontrado", cart);
      } else {
        return returnMessage(true, "Carrito no encontrado", null);
      }
    } catch (error) {
      return returnMessage(true, "Error al obtener el Carrito", null);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile("../data/carrito.txt", "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Carrito

