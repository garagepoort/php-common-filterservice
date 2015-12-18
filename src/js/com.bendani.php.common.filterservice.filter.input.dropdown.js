angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterInputDropdown', function (){
        return {
            scope: {
                filter: "=",
                onRemove: "&"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', '$compile', function($scope, $rootScope) {
                if ($scope.filter.type === "boolean") {
                    $scope.filterTemplate = 'packages/bendani/php-common/filter-service/popover/filter-boolean-popover-template.html';
                }
                if ($scope.filter.type === "text") {
                    $scope.filterTemplate = 'packages/bendani/php-common/filter-service/popover/filter-text-popover-template.html';
                }
                if ($scope.filter.type === "multiselect") {
                    $scope.filterTemplate = 'packages/bendani/php-common/filter-service/popover/filter-multiselect-popover-template.html';
                }
                if ($scope.filter.type === "number") {
                    $scope.filterTemplate = 'packages/bendani/php-common/filter-service/popover/filter-number-popover-template.html';
                }
                if ($scope.filter.type === "options") {
                    $scope.filterTemplate = 'packages/bendani/php-common/filter-service/popover/filter-options-popover-template.html';
                }

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-input-dropdown.html";
                };

            }]
        };
    });