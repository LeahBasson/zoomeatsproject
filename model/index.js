import { Users } from "./User.js";
import { Foods } from "./Foods.js";
import { Orders } from "./Orders.js";

//creating an object
const users = new Users() 
const foods = new Foods()
const orders = new Orders()

export {
    users,
    foods,
    orders
}