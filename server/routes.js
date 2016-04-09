exports.setup = function(app,cors,bodyParser){
  
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));    
  
  var Promise = require("node-promise").Promise;
  
  
  app.get('/search',function(req, res){
    
    var graph = require('fbgraph');
    graph.setAccessToken('CAACEdEose0cBANMxUHc4cSEYRUQ5YD2xvFY4NDDWABZBHfGgy4QBrcTQFxijqEyB0hozxhnaJtZCgArS86f9HmDZCPZBU7wavwFaRwx9LZB9iZAuo5ukIMITKTRJGAZAGJYIVJprXyn9YQ5ZCfxPPD0PcU4CTF1BcQeXZB7VztmOVGNaUZBsh9BYdZBarHT4QzL0wrS9yPejr8t3lidal0ZBwwdS');
    
    var promiseProfile = new Promise();
    var promisePicture = new Promise();

    graph.get("search?q="+req.query.find+"&type=page&limit=5", function(err, res){
        promiseProfile.resolve(res);
    });
    
    promiseProfile.then(function(response){
      //res.json(response);
        var parent = this;
        this.count = 0;
        var a = [];
        //console.log(response.data);
        for(var i=0;i<response.data.length;i++){
              //response.data[i];
              
              graph.get(response.data[i].id+'/picture', function(err, resp){  
                parent.count++;
                a.push(resp);
                if (parent.count == 5) {
                  promisePicture.resolve({profiles: response.data,images: a});
                }
              });
             
        }  
    });
    
    promisePicture.then(function(profilesImages){
      //console.log(profilesImages);
      for(var i = 0; i< profilesImages.profiles.length;i++){
        var profile = profilesImages.profiles[i];
        var image = profilesImages.images[i];
        profile.image ={has: image.image, location: image.location};
      }
      res.json(profilesImages.profiles);
    });
    
    /*promisePicture.then(function(r){
      console.log(r);
    });*/
    /*promise.then(function(response){
      res.json(response.data);
      //console.log(response.data);
      /*graph.get(response.data[0].id+'/feed?limit=50',function(err ,result){
        res.json(result.data);
      });*/
    //});
    console.log("Vlad Suge Pula");
   
  });  
  
  // test id 164960706892498
  
};
