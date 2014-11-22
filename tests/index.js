var app = require('express')(),
    boot = require('express-boot'),
    mdirect = require('../index.js'),
    expect = require('expect.js'),
    superagent = require('superagent');

describe('mobile-redirect test', function() {
    before(function(done) {
        app.use(mdirect());

        app.get('/', function(req, res) {
            res.json({
                page: 'home'
            });
        });

        app.get('/mobile', function(req, res) {
            res.json({
                page: 'mobile'
            });
        });
        boot.config({debug:false});
        boot(app).start();
        done()
    });
    
    describe('request home page: \'/\' with mobile user-agent.', function() {
        it('should respond to GET and return json response with a value: mobile', function(done) {
            superagent
                .get('http://localhost:' + boot().port)
                .set('User-Agent', 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10')
                .end(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.body.page).to.equal('mobile');
                    done();
                })
        });
    });


    after(function(done) {
        boot().close();
        done();
    })
});