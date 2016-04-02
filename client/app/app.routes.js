angular.module('app.routes',['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('homepage', {
            url: '/',
            templateUrl: 'app/sections/homepage/homepage.tpl.html',
            controller: function(){
              var vm = this;
              this.title = 'Serghei'
            },
            controllerAs: 'homepage'
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/sections/404/404.tpl.html'
        });

    $urlRouterProvider.otherwise('404');
});