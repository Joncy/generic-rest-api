// server.js

// Base setup
// =============================================================================

// Include packages
var express     = require('express'),
    app         = express();
var bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

var Resource    = require('./app/models/resource');

var baseRoute = '/api';

// App configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/api');

var port = process.env.PORT || 31416;

// Routes for API
// =============================================================================
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Request detected: ' + req.body);
  next();
});

router.get('/', function(req, res) {
  res.json({message:  'Welcome to generic REST API'});
});




// Routes that end in /res
router.route('/res')

    // Create a resource (accessed at POST to http://localhost:31416/api/res)
    .post(function(req, res) {
      var resource = new Resource();
      resource.name = req.body.name;

      resource.save(function(err) {
        if (err)
          res.send(err);
        res.json({message: 'Resource created'});
      });
    })

    // Get all the resources (accessed at GET http://localhost:31416/api/res)
    .get(function(req, res) {
        Resource.find(function(err, resources) {
            if (err)
                res.send(err);

            res.json(resources);
        });
    });

// Routes that end in /res/:id
router.route('/res/:id')
    // Update resource with id "id" (accessed at PUT http://localhost:31416/api/res:id)
    .put(function(req,res) {
      Resource.findById(req.params.id, function (err, resource) {
        if(err)
          res.send(err);

        resource.name = req.body.name;

        resource.save(function (err) {
          if (err)
            res.send(err);

          res.json("Resource updated");
        });
      });
    })

    // Delete resource with id "id" (accessed at DELETE http://localhost:31416/api/res:id)
    .delete(function(req,res) {
      Resource.remove({
        _id: req.params.id
      }, function(err,resource) {
        if (err)
          res.send(err);

        res.json("Resource deleted");
      });
    })
    
    // Get resource with id "id" (accessed at GET http://localhost:31416/api/res/:id)
    .get(function(req,res) {
      Resource.findById(req.params.id, function (err, resource) {
          if (err)
            res.send(err);
          res.json(resource);
      });
    });

// Set route handler
//  =============================================================================
app.use(baseRoute, router);

// Start server
// =============================================================================
app.listen(port);
console.log('REST server running on port ' + port);
