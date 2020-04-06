// Load dependencies
const app     = require('../app'),
      baseURL = util.format('http://localhost:%s', port),
      port    = 3000,
      util    = require('util'),
      winston = require('winston');

before(function(){
    app.listen(port, function(){
        winston.info(util.format('Server listening on port %s', port))
    });
});

describe('Creation', function(){
    it('Should create dummy data', function(done){
        request(baseURL)
        .post('/data')
        .set('Content-Type', 'application/json')
        .send({'ts': '2020-04-06T13:47:00Z',
               'type': 'temp',
               'value': 34,
               'sensor_id': 123
            })
        .expect(201)
        .end(function(err, res){
            if (err) throw err;
            done();
        })
    });
});