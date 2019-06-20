const conn = require('./connection');
var use = conn.connection();
const env = require('dotenv');
var data;

if(use.con) {
    use.con.connect((err, client) => {     
        if(client) {
           database = client.db(use.config._DATABASE_NAME);
           collection = database.collection(use.config._COLLECTION);
           console.log("Connected Succefull to " + use.config._DATABASE_NAME + "!");
           if(collection){
                getUsers();
                client.close();
           }
        } else if(err) {
           console.log('Error occurred while connecting to MongoDB Atlas =:> \n',err);
        }
    });
}

getUsers = () => {
    collection.find({}).toArray((error, result) => {
        let response;
        if(error) {
            response = error;
        } else if(result) {
            console.log(response)
            response = result;
        }

        return response
    });
}