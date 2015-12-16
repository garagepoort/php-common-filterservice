angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterBoolean', function (){
        return {
            scope: {
                filter: "=filter",
                onRemove: '&'
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                $scope.filter.value = false;
                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-boolean.html";
                }
            }]
        };
    });