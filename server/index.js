const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 5000

app.use(bodyParser.json())
// app.use('/public/uploads',express.static('public/uploads'))

//controllers
const AuthController = require('./constrollers/user')
const RoomController = require('./constrollers/room')
const CustomerController = require('./constrollers/customer')
const OrderController = require('./constrollers/order')

//middlewares
const { authenticated } = require('./middleware')
//multer
// const {upload}  = require('./upload')

app.group("/api/v2", (router) => {
    
    //Users
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)    
    
    //Rooms
    router.get('/rooms',authenticated, RoomController.index)   
    router.get('/room/:id',authenticated, RoomController.show)   
    router.post('/room',authenticated, RoomController.store)   
    router.put('/room/:id',authenticated, RoomController.update)   
    router.delete('/room/:id',authenticated, RoomController.delete)   
        
    //Customers
    router.get('/customers',authenticated, CustomerController.index)   
    router.get('/customer/:id',authenticated, CustomerController.show)   
    router.post('/customer',authenticated, CustomerController.store)   
    router.put('/customer/:id',authenticated, CustomerController.update)   
    router.delete('/customer/:id',authenticated, CustomerController.delete)   

    //Orders It's NOT FIX ! soon!!!!!! !important <!-- Hurry UP -->
    router.get('/checkins',authenticated, OrderController.index)   
    router.post('/checkin',authenticated, OrderController.store)   
    router.put('/checkout/:id',authenticated, OrderController.update)   

})


app.listen(port, () => console.log(`Listening on port ${port}!`))