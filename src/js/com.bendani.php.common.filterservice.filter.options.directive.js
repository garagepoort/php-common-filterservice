angular
    .module('com.bendani.php.common.filterservice', [])
    .directive('filterOptions', function (){
        return {
            scope: {
                filter: "=filter"
            },
            restrict: "E",
            templateUrl: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                $scope.filter.value = "";
                $scope.filter.selectedOperator = $scope.filter.supportedOperators[0];

                $scope.shouldShowOperators = function(){
                    return $scope.filter.supportedOperators.length > 1;
                }

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-options.html";
                }
            }]
        };
    });