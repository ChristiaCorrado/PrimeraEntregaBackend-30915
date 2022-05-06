const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs");
const { Server: IOServer, Socket } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const CreadorDeTablas = require("./dataBase/startDB/createTable");
const tablaChat = new CreadorDeTablas();
const routerProductos = require("./routes/allProducts.js");
const routerCarrito = require("./routes/carts.js");
const routerProductoTest = require("./routes/producto-test")
const optionsSqlite = require("./dataBase/options/sqliteDB");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')


app.use(`/api`, routerProductos);
app.use("/api", routerCarrito);
app.use("/api", routerProductoTest)

app.use(express.static('./public'))

app.get('/api', (req, res) => {
  res.sendFile('index.html')
})



const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) => {
  console.log(`error: ${error.message}`);
});



const messages =  []


io.on("connection", (socket) => {
  console.log("SE CONECTO UN USUARIO");
  socket.emit("messages", messages);

  socket.on("mensaje", (data) => {
    mensajes.push(data);
    console.log(mensajes);
    io.sockets.emit(mensajes);
  });

  socket.on("new-message", (data) => {
    console.log(data);
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});
