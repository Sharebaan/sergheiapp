exports.setup = function(req,res) {
  var Promise = require("node-promise").Promise;
  
  var graph = require('fbgraph');
    graph.setAccessToken('CAACEdEose0cBANZBXyXPkN3x3YEEUPnDdhIQ990qoWDtdLZAcQGnxC7DeFDt1PPbhh9jgqZBbI9AVv5qBkMAXSt28ZAY6Qr9zLU8o6uTMo1fBD2fduSSueXypWoAk9GcuN5rvK32Xl7ZB3RieZBdkpuXMUYrCjWew7nlhm1CfcBspnZBcRZCZAxN85Fu8vJt5pNZA6N1S05he8OwStCTcYOZC59');
    
    var promiseProfile = new Promise();
    var promisePicture = new Promise();

    graph.get("search?q="+req.query.find+"&type=page&limit=5", function(err, res){
      promiseProfile.resolve(res);
    });
    
    promiseProfile.then(function(response){
      var parent = this;
      this.count = 0;
      var images = [];
      var promises = [];
      for(var i=0;i<response.data.length;i++){
        graph.get(response.data[i].id+'/picture', function(err, resp){
          parent.count++;
          images.push(resp);
          if (parent.count == response.data.length) {
            promisePicture.resolve({profiles: response.data,images: images});
          }
        });
           
      }  
    });
    
    promisePicture.then(function(profilesImages){
      for(var i = 0; i< profilesImages.profiles.length;i++){
        var profile = profilesImages.profiles[i];
        var image = profilesImages.images[i];
        profile.image ={has: image.image, location: image.location};
      }
      res.json(profilesImages.profiles);
    });
};