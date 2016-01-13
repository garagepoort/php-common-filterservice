angular
    .module('com.bendani.php.common.filterservice')
    .directive('filtersDirective', function (){
        return {
            priority: 1001,
            scope: {
                onFilter: "&"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', 'FilterService', function($scope, $rootScope, FilterService) {
                $scope.filterSelectTemplate = 'packages/bendani/php-common/filter-service/filter-select-popover.html';

                $scope.selectedFilters = FilterService.getSelectedFilters();
                $scope.allFilters = FilterService.getAllFilters();

                FilterService.registerHandler(function(allFilters, selectedFilters){
                    $scope.allFilters = allFilters;
                    $scope.selectedFilters = selectedFilters;
                });

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filters-directive.html";
                };

                $scope.onRemove = function(filter){
                   FilterService.unselectFilter(filter);
                };

                $scope.deselectFilter = function(filter){
                    FilterService.unselectFilter(filter);
                };
                $scope.selectFilter = function(filter){
                    FilterService.selectFilter(filter);
                };

                $scope.isSelected = function(filter){
                    FilterService.isFilterSelected(filter);
                };

                $scope.filter = function(){
                    $scope.onFilter({ selectedFilters: FilterService.convertFiltersToJson()});
                };

            }]
        };
    });