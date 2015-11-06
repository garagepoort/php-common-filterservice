angular
    .module('com.bendani.php.common.filterservice', ['frapontillo.bootstrap-switch'])
    .directive('filterBoolean', function (){
        return {
            scope: {
                filter: "=filter"
            },
            restrict: "E",
            templateUrl: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                $scope.filter.value = false;
                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-boolean.html";
                }
            }]
        };
    });