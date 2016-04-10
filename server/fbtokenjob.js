exports.fbjob = function(){
    var CronJob = require('cron').CronJob;
    var job = new CronJob('* 0 */3 * * *', function() {
       
        var graph = require('fbgraph');
        graph.extendAccessToken({
            "access_token":    'CAAa2VsggtIsBACZAvhbiHY3eEtFDZB2D9JD1V5JSg7wGZCNpNan1s6LF5htCZCZAhqwYo5gqYkFQrrZCyhh6QqtBZBjx7ejpvVpb91kRDZCwccFzT1IYafhpTkPVlsvYHtBvjvkbZCelwTqrtYZA9ny8UCnOLGnhXh4rV8PVPvOyKyDsaIm0nY9SBaZAuPosgZA7yFjeFglfJ1kd5zfVyx7gT2Pv'
          , "client_id":      '1889333701293195'
          , "client_secret":  '69cd7a44b08376ab0ce90a5246424894'
        }, function (err, facebookRes) {
           //console.log(facebookRes.access_token);
           global.fbt = facebookRes.access_token;
        });
      },
      true /* Start the job right now */
    );
    job._callbacks[0]();
    job.start();
}
