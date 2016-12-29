var demo = angular.module('demo', ['baiduMap']);

demo.controller('demoCtrl', ['$scope', '$timeout',
    function($scope, $timeout) {

        $scope.offlineOpts = {retryInterval: 5000};

        var longitude = 121.506191;
        var latitude = 31.245554;
        $scope.mapOptions = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 17,
            city: 'ShangHai',
            markers: [{
                longitude: longitude,
                latitude: latitude,
                icon: 'img/mappiont.png',
                width: 49,
                height: 60,
                title: 'Where labe label',
                content: 'Put description here'
            }]
        };

        $scope.mapLoaded = function(map, BMap, BMapLib) {
            console.log(map, BMap, BMapLib);
            console.log(typeof map, typeof BMap, typeof BMapLib);
        };

        $scope.labelClicked = function(marker) {
            console.log(marker);
        }

        $timeout(function() {
            $scope.mapOptions.center.longitude = 121.500885;
            $scope.mapOptions.center.latitude = 31.190032;
            $scope.mapOptions.markers[0].longitude = 121.500885;
            $scope.mapOptions.markers[0].latitude = 31.190032;
        }, 5000);
    }
]);
