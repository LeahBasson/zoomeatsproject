import { userRouter, express } from './controller/UserController.js'
import { foodRouter  } from './controller/FoodController.js'
import path from 'path'
import cors from 'cors';


//Create an express app 
const app = express()
const port = +process.env.PORT || 3800


//Middleware - Middleware is software that lies between an operating system and the applications running on it. 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  //enables your server to accept requests from any origin.
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next() //The next() function is called to pass control to the next middleware function in the stack.
})

app.use(
    express.static('./static'),
    express.json(), 
    express.urlencoded({
        extended:true
    }))
 //use cors
app.use(cors());
   
app.use('/user', userRouter) //to get all the endpoints  //Brackets to parse a string
app.use('/food' , foodRouter)
//Endpoint // the get endpoint allows you to retrieve something
app.get('^/$|/order', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})

//If you looking for something that doesnt exist
app.get ('*', (req, res) => {
    res.json({
        status: 404,
        msg: 'Resource Not Found'
    })
})

//listen assigns a port number to a server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
