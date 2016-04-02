exports.setup = function(app){
  
  app.get('/da',function(req, res){
    var graph = require('fbgraph');
    var Promise = require("node-promise").Promise;
    var promise = new Promise();
    
    graph.setAccessToken("CAACEdEose0cBACZBM0MjiU0gdO50LDeSL6MEGq3cSxE8WbLDPOsnZCZAVlxeil5M0ZBb3JJK5Y7IqWuLkEEn3YjmID4wHri0RI16k42GTTkoDUFUu0ZAad3hfTmotlgRqN9PpLnz4SzALoTeFZCp2IMm3boyed7FT10y1zUdn3QkgqHZAvHJAv9xkBs69mLewoyNksd0Xuolxg9szzHS1PZB");

    graph.get("thehodgetwins", function(err, res){
        promise.resolve(res);
    });
    promise.then(function(response){
      res.send(JSON.stringify(response));
    });
   
  });  
  
};
