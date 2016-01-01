angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterDate', function (){
        return {
            scope: {
                filter: "=filter"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                if(!$scope.filter.value){
                    $scope.filter.value = {};
                }
                if(!$scope.filter.selectedOperator && $scope.filter.supportedOperators){
                    $scope.filter.selectedOperator = $scope.filter.supportedOperators[0];
                }

                $scope.datepickerFrom = {
                    opened: false
                };

                $scope.datepickerTo = {
                    opened: false
                };

                $scope.openDatePickerFrom = function(){
                    $scope.datepickerFrom.opened = true;
                };

                $scope.openDatePickerTo = function(){
                    $scope.datepickerTo.opened = true;
                };

                $scope.setSelectedOperator = function (operator) {
                    $scope.filter.selectedOperator = operator;
                };

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-date.html";
                };
            }]
        };
    });