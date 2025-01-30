import { connection as db } from '../config/index.js';

class Orders {
    fetchOrders(req, res) {
        const strQry = `
        SELECT o.orderID, o.foodID, o.userID, o.quantityOfItems, o.amount
        FROM Users u
        INNER JOIN Orders o
        USING(userID)
        INNER JOIN Foods f 
        USING(foodID)
        `;

        db.query(strQry, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    error: err.message
                });
            }
            res.json({
                status: 200,
                results 
            });
        });
    }

    fetchUserOrders(req, res) {
        const strQry = `
            SELECT o.orderID, o.foodID, o.userID, o.quantityOfItems, o.amount
            FROM Orders o
            INNER JOIN Users u ON o.userID = ${req.params.uid}
            INNER JOIN Orders h ON o.foodID = o.foodID
            WHERE u.userID = ${req.params.uid};
        `;

        db.query(strQry, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    error: err.message
                });
            }
            res.json({
                status: 200,
                results 
            });
        });
    }

    addOrder(req, res) {
        try {  
            const strQry = `
            INSERT INTO Orders
            SET ? ;   
            `  // or you can use this VALUES (?, ? , ?, ?)
            db.query(strQry, [req.body], (err) =>{
                if(err) throw new Error ('Unable to add a new order.')
                    res.json({
                        status: res.statusCode,
                        msg: 'Order was added'
                    })
        })
        
        } catch(e) {
            res.json({
                status: 400, // Mistake on the clients side (Maybe syntax error)
                err: e.message //The error message from the if statement
        })
        }
    }

    updateOrder(req, res) {
        try {
            const strQry = `
            UPDATE Orders
            SET ?
            WHERE userID = ${req.params.uid} AND orderID = ${req.params.orderID};
            `  
            db.query (strQry, [req.body], (err) => {
                if (err) throw new Error ('Unable to update a order.')
                    res.json({
                        status: res.statusCode,
                        msg: 'Order was updated.'
                })
            })
        } catch(e) {
            res.json({
                status: 400,
                err: e.message //The error message from the if statement
        })
        }
    }

    deleteOrder(req, res) {
        try{
            const strQry = `
            DELETE FROM Orders
            WHERE userID = ${req.params.uid} AND orderID = ${req.params.orderID};
            `
            db.query (strQry, (err) => {
                if(err) throw new Error('To delete a order, please review your delete query.')
                    res.json({
                        status: res.statusCode,
                        msg: 'A order was removed.'
                })
            })
        } catch(e) {
            res.json({
                status: 404, //Resource not found
                err: e.message
            })
        }
    }

    deleteOrders(req, res) {
        try{
            const strQry = `
            DELETE FROM Orders
            WHERE userID = ${req.params.uid};
            `
            db.query (strQry, (err) => {
                if(err) throw new Error('To delete orders, please review your delete query.')
                    res.json({
                        status: res.statusCode,
                        msg: 'All orders were removed.'
                })
            })
        } catch(e) {
            res.json({
                status: 404, //Resource not found
                err: e.message
            })
        }
    }
}

export {
    Orders
};
