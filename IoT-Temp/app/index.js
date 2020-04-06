// Load dependencies
const app      = require('./app'),
      util     = require('util'),
      winston  = require('winston');

// Define API port
let port = process.env.PORT || 1337;

// Run API
app.listen(port, function(){
    winston.info(util.format('Server listening on port %s', port));
});