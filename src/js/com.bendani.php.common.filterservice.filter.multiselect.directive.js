angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterMultiselect', function (){
        return {
            scope: {
                filter: "=filter",
                onRemove: '&'
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                if(!$scope.filter.value){
                    $scope.filter.value = [];
                }

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-multiselect.html";
                };

                $scope.getMultiselectTemplate = function () {
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/multiselect.tmpl.html";
                }
            }]
        };
    });