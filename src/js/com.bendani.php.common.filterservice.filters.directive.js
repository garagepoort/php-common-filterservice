angular
    .module('com.bendani.php.common.filterservice')
    .directive('filtersDirective', function (){
        return {
            scope: {
                allFilters: "=",
                selectedFilters: "=",
                onFilter: "&"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', '$compile', function($scope, $rootScope, $compile) {
                $scope.filterSelectTemplate = 'packages/bendani/php-common/filter-service/filter-select-popover.html';

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filters-directive.html";
                };

                $scope.onRemove = function(filter){
                    var index = $scope.selectedFilters.indexOf(filter);
                    if(index > -1){
                        $scope.selectedFilters.splice(index, 1);
                    }
                };

                $scope.isSelected = function(filter){
                    var index = $scope.selectedFilters.indexOf(filter);
                    return index > -1
                };

                $scope.filter = function(){
                    $scope.onFilter({selectedFilters: convertFiltersToJson($scope.selectedFilters) });
                };

                function convertFiltersToJson(filters){
                    var result = [];
                    for (var filter in  filters) {
                        var filterObject = filters[filter];
                        result.push({
                            id: filterObject.id,
                            value: filterObject.value,
                            operator: filterObject.selectedOperator.value
                        });
                    }

                    return result;
                }

            }]
        };
    });