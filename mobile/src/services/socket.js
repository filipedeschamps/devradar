import socketio from 'socket.io-client'

const socket = socketio('https://3333-e2a21926-c37f-47d1-8d7f-be7fca037f76.ws-us02.gitpod.io/', {
    autoConnect: false
})

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction)
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    
    socket.connect()
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}