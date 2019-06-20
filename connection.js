   const env = require('dotenv');
   const MongoClient = require('mongodb').MongoClient;
   const result = env.config();
   var client;

   // replace the uri string with your connection string.
   var _CONNECTION_CONFIG = {
      _URL: process.env._SERVER,
      _DATABASE_NAME: process.env._DATABASE_NAME,
      _COLLECTION: process.env._COLLECTION,
   }

module.exports.connection = () => {
   console.log("Configuration used is =:>",_CONNECTION_CONFIG)

   // INITIALIZE CONNECTION WITH MONGODB ATLAS
   client = new MongoClient(_CONNECTION_CONFIG._URL, { useNewUrlParser: true });
   return {con: client, config: _CONNECTION_CONFIG};
}