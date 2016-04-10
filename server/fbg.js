exports.fbgraph = function(){
  var graph = require('fbgraph');
  graph.setAccessToken(global.fbt);
  return graph;
}