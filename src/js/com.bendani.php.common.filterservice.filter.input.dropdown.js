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
                if ($scope.filter.type === "date") {
                    $scope.filterTemplate = 'packages/bendani/php-common/filter-service/popover/filter-date-popover-template.html';
                }

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-input-dropdown.html";
                };

                $scope.getDropdownLabel = function(){
                    var label = $scope.filter.key + ": ";

                    if($scope.filter.selectedOperator){
                        label =  label + ' ' + $scope.filter.selectedOperator.key + ' ';
                    }

                    if($scope.filter.value){
                        if( Object.prototype.toString.call($scope.filter.value) === '[object Array]' ) {
                            var mapped = _.map($scope.filter.value, function(item){ return item.key; });
                            $conArray = mapped.join(', ');
                            $valueString = $conArray.substring(0, 10) + "... (" + mapped.length + ")";
                            label = label + $valueString;
                        }else{
                            label = label + $scope.filter.value;
                        }
                    }
                    return label;
                }

            }]
        };
    });