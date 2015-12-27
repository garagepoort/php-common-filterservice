angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterOptions', function (){
        return {
            scope: {
                filter: "=filter"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                if(!$scope.filter.value){
                    $scope.filter.value = "";
                }
                if(!$scope.filter.selectedOperator && $scope.filter.supportedOperators){
                    $scope.filter.selectedOperator = $scope.filter.supportedOperators[0];
                }

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-options.html";
                }
            }]
        };
    });