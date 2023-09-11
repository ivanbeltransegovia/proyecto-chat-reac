const http=require(`http`)
const { Socket } = require('socket.io')

const server=http.createServer()

const io=require('socket.io')(server,{
    cors:{
        origin:'*'
    }
})

io.on('connection',(socket)=>{
    console.log("conectado al servidor")
    //console.log(socket)

    socket.on('chat_message',(data)=>{
        io.emit('chat_message',data)
    })
})

server.listen(3000)
