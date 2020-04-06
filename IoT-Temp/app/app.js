// Load dependencies
const bodyParser  = require('body-parser'),
      express     = require('express'),
      winston     = require('winston');

// Create express app
let app = module.exports = express();

// Body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Handle incoming data
app.post('/data', (req, res, next) => {
            winston.info(req.body);
            return res.sendStatus(201)
        });