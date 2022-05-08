const { normalize, schema, denormalize } =  require("normalizr") ;
const fs = require("fs")

const originData = JSON.parse(fs.promises.readFile("../dataBase/chat.txt", "utf8"))


console.log(originData);


const authorSchema = new schema.Entity('author')

const postScha = new schema.Entity('posts',{
    author: authorSchema,
    message:[text]
})

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true));
}

const normalizrData = normalize(originData,postScha)

const denormalizrData = denormalize(normalizrData.result, postScha, normalizrData.entities)