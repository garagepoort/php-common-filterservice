angular
    .module('com.bendani.php.common.filterservice')
    .directive('selectedFilters', function (){
        return {
            scope: {
                filters: "=filters"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {;
                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/selected-filters.html";
                };

                $scope.onRemove = function(filter){
                    var index = $scope.filters.indexOf(filter);
                    $scope.filters.splice(index, 1);
                }
            }]
        };
    });