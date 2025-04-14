const path = require('path')
const express = require('express')
/*
we imported http module cause socket.io needs http server to work correctly because
the underlying idea of sockets is that we are going to upgrade the existing connection to an websocket connection
so our initial httprequest is gonna be upgraded. This upgrades are not possible in the case of express 
that is the reason for us to use http module along with express
*/
const http = require('http')
// To handle the websocket connections we are using this server class which is provided by socket.io library
const {Server} = require('socket.io')
const app = express()
const server = http.createServer(app) // combining both express and http module to handle socket connections.
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))


const io = new Server(server)


io.on('connection', (socket) => {
  // Io.on would be listning for all the new socket connection and adding new connections,
  // the callback which socket would be representing an individual client connection.
   socket.on('usermessage',(message)=>{
    // Now after the client is connected the server would listen for an custom event which is usermessage
    // which comes from the front-end meaning the users, once there is a message from that event.
    io.emit("message",message)
    // then we would be sending that message to all the connected client using
    // io.emit method which as an event called message which would be listened on the front-end,
    // so that we can display the message that users send to server and server emitted those messages
   })
})
//

// to attach sockets with our express sever we gonn use http module in this case.
server.listen(9000, () => console.log('server started at 9000'))

function mainpagerender(request,response){
  response.render('home')
}
app.get('/',mainpagerender)