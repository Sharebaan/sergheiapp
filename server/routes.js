exports.setup = function(app,cors,bodyParser){
  
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));    
  
  app.get('/da',function(req, res){
    
    //res.json({pulamea:req.query.search});
    var graph = require('fbgraph');
    var Promise = require("node-promise").Promise;
    var promise = new Promise();
    
    graph.setAccessToken("CAACEdEose0cBAJw2ms3d5qm2IWcZA7WfqydddOn2HI1wAV38ZAZCSgnwuZAId8fZB1HHFkjFpNf7OjaAnDNl3U5fuTiZA7M9dlZCmTq9aR3LdN2iRrUH3XALh7UttpuHZCmtIh0ZAqvEMZBv2fGrlxuZATcT8ZCi6m27NHrp6966M6APwZCjhzLJpen3Kax4WJBXLbDZB7wEIgyWcGRvJzlFnxsbPu");

    graph.get("search?q="+req.query.search+"&type=page&limit=10", function(err, res){
        promise.resolve(res);
    });
    promise.then(function(response){
      res.json(response.data);
      //console.log(response.data);
      /*graph.get(response.data[0].id+'/feed?limit=50',function(err ,result){
        res.json(result.data);
      });*/
    });
   
  });  
  
};
