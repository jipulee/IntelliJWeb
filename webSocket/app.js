const express = require('express')
const { listen } = require('express/lib/application')
const socket = require('socket.io')

//App setup
const app = express()
var server = app.listen(3000, () => {
    console.log('listening to requests on port 3000')
})

//Static files
app.use(express.static('public'))

//Socket IO
const io = socket(server)
io.on('connection', (socket) => {
    console.log('made socket connection',socket.id)

    socket.on('chat', (data)=>{
        //refer all socket
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data)
    })
})


