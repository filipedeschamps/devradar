const axios = require('axios')
const Dev = require('../models/dev.js')
const { findConnections, sendMessage } = require('../websocket.js')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find()

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, longitude, latitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            
            const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = githubResponse.data

            const techsArray = techs.split(',').map(tech => tech.trim())

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location: {
                type: 'Point',
                    coordinates: [longitude, latitude]
                }
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            console.log(`> sendSocketMessageTo: ${sendSocketMessageTo.length}`)

            sendMessage(sendSocketMessageTo, 'new-dev', dev)

        }

        response.json(dev)
    }
}