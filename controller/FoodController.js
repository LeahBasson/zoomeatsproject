import express from 'express'
import bodyParser from 'body-parser'
import { foods } from '../model/index.js'  //importing the object that will be used.
import { verifyAToken } from '../middleware/AuthenticateUser.js'

const foodRouter = express.Router()

foodRouter.use(bodyParser.json()) //to not call bodyParser on each and every endpoint, register once using 'router.use' // the body parser is used to pass the body as json. when you sending data from the database you need to have a pipeline body parser is that pipeline // when the user sends a request you need to have a body parser.

foodRouter.get('/', (req, res) => {   //a middleware which is verifyAToken is placed between an endpoint and a callback function
    foods.fetchFoods(req, res) 
})

foodRouter.get('/recent', (req, res) => {  
    foods.recentFoods(req, res) 
})

foodRouter.get ('/:id', (req, res) => {
    foods.fetchFoodItem(req, res)
})

foodRouter.post('/add', verifyAToken, (req, res) => {
    foods.addFood(req, res)
})

foodRouter.patch('/:id', verifyAToken, (req, res) => {
    foods.updateFood(req, res)
})

foodRouter.delete('/:id', verifyAToken, (req, res) => { 
    foods.deleteFood(req, res)
})

export {
    express,
    foodRouter
}