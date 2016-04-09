exports.search =  function(req,res) {
  
  var Promise = require("node-promise").Promise;
  var graph = require('../fbg').fbgraph();
    
    
    var promiseProfile = new Promise();
    var promisePicture = new Promise();
    
    var limit = req.query.limit || 5;
    var offset = req.query.offset || 0;
    var params = {
      q: req.query.find,
      type: 'page',
      limit: limit,
      offset: offset
    }
    
    graph.get("search", params, function(err, res){
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