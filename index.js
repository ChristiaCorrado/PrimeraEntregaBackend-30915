const express = require("express");
const app = express();
const PORT = 8080;
const { Server : IOServer, Socket } = require("socket.io")
const { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const CreadorDeTablas = require("./dataBase/startDB/createTable")
const tablaChat = new CreadorDeTablas()
const routerProductos = require("./routes/allProducts.js")
const routerCarrito = require("./routes/carts.js")
const optionsSqlite = require("./dataBase/options/sqliteDB")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(`/api`, routerProductos);
app.use('/api', routerCarrito);


const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
  })
  connectedServer.on('error',(error) => {console.log(`error: ${error.message}`)})  

  const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
  ];

  const knexChat = require('knex')(optionsSqlite)

  io.on('connection',(socket) => {
    console.log('SE CONECTO UN USUARIO');
    tablaChat.crearTablaChat()
    socket.emit('messages', messages)
      
    socket.on('mensaje', (data)=>{
      mensajes.push(data)
      console.log(mensajes)
      io.sockets.emit(mensajes)
    })
    
    socket.on('new-message',data => {
      messages.push(data);
      io.sockets.emit('messages', messages);
  });
  
  
  })