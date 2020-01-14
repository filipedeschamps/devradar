const Dev = require('../models/dev.js')

module.exports = {
    async index(request, response) {
        const { longitude, latitude, techs } = request.query

        const techsArray = techs.split(',').map(tech => tech.trim())

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        response.json(devs)
    }
}