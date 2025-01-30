import express from 'express'
import bodyParser from 'body-parser'
import { users } from '../model/index.js'
import { orders } from '../model/index.js'

const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.get('/', (req, res) => {
    users.fetchUsers(req, res)
})

userRouter.get ('/:id', (req, res) => {
    users.fetchUser(req, res)
})

userRouter.post('/register', (req, res) => {
    users.registerUser(req, res)
})

userRouter.patch('/:id', (req, res) => {
    users.updateUser(req, res)
})

userRouter.delete('/:id', (req, res) => {
    users.deleteUser(req, res)
})

userRouter.post('/login', (req, res) => {
    users.login(req, res)
})

// Orders
userRouter.get('/:uid/orders', (req, res) => {
    orders.fetchOrders(req, res)
})

userRouter.get('/:uid/order', (req, res) => {
    orders.fetchUserOrders(req, res)
})

userRouter.post('/:uid/order', (req, res) => {
    orders.addOrder(req, res)
})

userRouter.patch('/:uid/order/:orderID', (req, res) => {
    orders.updateOrder(req, res)
})

userRouter.delete('/:uid/order/:orderID', (req, res) => {
    orders.deleteOrder(req, res)
})

userRouter.delete('/:uid/orders', (req, res) => {
    orders.deleteOrders(req, res)
})

export {
    express,
    userRouter
}