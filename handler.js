'use strict';
const conn = require('./connection');
var use = conn.connection();
const env = require('dotenv');
var resultado = 'beta';
// emails send
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
if (use.con) {
  use.con.connect((err, client) => {
    if (client) {
      database = client.db(use.config._DATABASE_NAME);
      collection = database.collection(use.config._COLLECTION);
      if (collection) {

        collection.find({}).toArray((error, result) => {
          let response;
            if(error) {
              resultado = error;
            } else if(result) {
              resultado = result;
            }
        });
      }
    } else if (err) {
    }
    client.close();
  });
}

module.exports.hello = function(event, context, callback) {
  let msg = "Hola companiero este ejemplo debe de funcionar bien. API is =>"
  let dataParameters = event.queryStringParameters;
  const response = { 
    statusCode: 200, 
    body: JSON.stringify ({ 
      message: msg,
      token2: process.env.TOKEN_JS,
      queryString: dataParameters
    }), 
  };

  callback(null, response);
}

module.exports.fiveMinutes = function(event, context, callback) {
  let msg = "Corriendo cada 5 minutos"

  const response = { 
    statusCode: 200, 
    body: JSON.stringify ({ 
      message: msg,
    }), 
  };

  callback(null, response);
}

module.exports.sendEmail = function(event, context, callback) {
  var sendToUser;
  var response = '';
  var msg;
  try {

    if (event.body) {
      var data = JSON.parse(event.body);

      msg = {
        to: data.to, // user's email here
        from: 'jsarmiento1614@gmail.com', // your company's email here
        subject: data.subject,
        text: data.message
      };

      sgMail.send(msg);

      response =  'Correo enviado satisfactoriamente a ' + data.to;

    } else {
      response =  'Al parecer no completo todos los campos requeridos';
    }

    sendToUser = { 
      statusCode: 200, 
      body: JSON.stringify ({ 
        message: response,
        send: msg
      }), 
    };
    callback(null, sendToUser);

  } catch(e) {
    sendToUser = { 
      statusCode: 500, 
      body: JSON.stringify ({ 
        message: e
      }), 
    };
    callback(null, sendToUser);
  }
 
};
