angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterNumber', function (){
        return {
            scope: {
                filter: "=filter",
                onRemove: '&'
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                if(!$scope.filter.value){
                    $scope.filter.value = 0;
                }
                if(!$scope.filter.selectedOperator){
                    $scope.filter.selectedOperator = $scope.filter.supportedOperators[0];
                }

                $scope.shouldShowOperators = function(){
                    return $scope.filter.supportedOperators.length > 1;
                };

                $scope.setSelectedOperator = function (operator) {
                    $scope.filter.selectedOperator = operator;
                };

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-number.html";
                };
            }]
        };
    });