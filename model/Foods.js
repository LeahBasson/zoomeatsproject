import { connection as db} from '../config/index.js'

class Foods {
    fetchFoods(req, res) {
        try {           //try statement is used to handle errors
            const strQry = `SELECT FoodID, ItemName, ItemDesc, Price, Category, image_url, quantity, prep_time_minutes
            FROM Foods;
            `
    
            db.query(strQry, (err, results) => {
                if (err) throw new Error(err)
                res.json({
                    status: res.statusCode,
                    results //creates a key and assigns a value to it 
                })
            })
        }
         catch(e){
            res.json({
                status: 404,
                err: e.message
            })
        }
    }

    recentFoods(req, res) {
        try{
            const strQry = `
            SELECT FoodID, ItemName, ItemDesc, Price, Category, image_url, quantity, prep_time_minutes
            FROM Foods
            ORDER BY foodID DESC
            LIMIT 4; 
            `

            db.query(strQry, (err, results) => {
                if (err) throw new Error(err)
                res.json({
                    status: res.statusCode,
                    results
            })
            })
        } catch(e) {
            console.error('Error retrieving food item:', e);
            res.json({
                status: 404,
                err: e.message
            })
        }
    }

    fetchFoodItem(req, res) {
            try{
                const stryQry = `
                SELECT foodID, FoodID, ItemName, ItemDesc, Price, Category, image_url, quantity, prep_time_minutes
                FROM Foods 
                WHERE foodID = ${req.params.id};`
                db.query(stryQry, (err, result) => {
                    if (err) throw new Error(err)
                        res.json({
                       status: res.statusCode,
                       result: result[0]  //result for a single product 
                    })
                })
            } catch (e) {
                res.json({
                    status: 404,
                    err:e.message
                })
            }
    }

    addFood(req, res) {
        try {  
            const strQry = `
            INSERT INTO Foods
            SET ? ;   
            `  // or you can use this VALUES (?, ? , ?, ?)
            db.query(strQry, [req.body], (err) =>{
                if(err) throw new Error ('Unable to add a new food item')
                    res.json({
                        status: res.statusCode,
                        msg: 'Food item was added'
                    })
        })
        
        } catch(e) {
            res.json({
                status: 400, // Mistake on the clients side (Maybe syntax error)
                err: e.message //The error message from the if statement
        })
        }
    }
    
    updateFood(req, res) {
        try {
            const strQry = `
            UPDATE Foods
            SET ?
            WHERE foodID = ${req.params.id}
            `  
            db.query (strQry, [req.body], (err) => {
                if (err) throw new Error ('Unable to update a food item')
                    res.json({
                        status: res.statusCode,
                        msg: 'Food item was updated.'
                })
            })
        } catch(e) {
            res.json({
                status: 400,
                err: e.message //The error message from the if statement
        })
        }
    }

    deleteFood(req, res) {
        try{
            const strQry = `
            DELETE FROM Foods
            WHERE foodID = ${req.params.id};
            `
            db.query (strQry, (err) => {
                if(err) throw new Error('To delete a food item, please review your delete query.')
                    res.json({
                        status: res.statusCode,
                        msg: 'A food item was removed.'
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
    Foods
 }