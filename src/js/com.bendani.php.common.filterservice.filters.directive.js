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

                        if(validateFilter(filterObject)){
                            var newFilter = {
                                id: filterObject.id,
                                value: filterObject.value,
                            };

                            if(filterObject.selectedOperator){
                                newFilter.operator = filterObject.selectedOperator.value;
                            }

                            result.push(newFilter);
                        }
                    }

                    return result;
                }

                function validateFilter(filter){
                    if(filter.type === 'date'){
                        if(!filter.value || !filter.value.from){
                            return false;
                        }
                    }
                    if(filter.type === 'multiselect'){
                        if(filter.value.length === 0){
                            return false;
                        }
                    }
                    return true;
                }

            }]
        };
    });