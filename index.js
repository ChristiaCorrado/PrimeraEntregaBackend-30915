const express = require("express");
const app = express();
const PORT = 8080;
const { Server : IOServer, Socket } = require("socket.io")
const { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const routerProductos = require("./routes/allProducts.js")
const routerCarrito = require("./routes/carts.js")

let knex = require("knex")({
  client: 'sqlite3',
  connection: {filename: './dataBase/ecommerce.sqlite'}},)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(`/api`, routerProductos);
app.use('/api', routerCarrito);


const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
  })
  connectedServer.on('error',(error) => {console.log(`error: ${error.message}`)})  


