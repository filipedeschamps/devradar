const { Router } = require('express')
const DevController = require('./controllers/dev.js')
const SearchController = require('./controllers/search.js')

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.get('/search', SearchController.index)

module.exports = routes