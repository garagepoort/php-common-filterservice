angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterSelect', function (){
        return {
            scope: {
                allFilters: "=",
                selectedFilters: "="
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {

                function init(){
                    $scope.groups = [];

                    for(var i = 0; i < $scope.allFilters.length; i++){
                        var group = $scope.allFilters[i].group;
                        if($scope.groups.indexOf(group) == -1){
                            $scope.groups.push(group);
                        }
                    }
                }

                $scope.selectFilter = function selectFilter($event, filter){
                    var checkbox = $event.target;
                    if(checkbox.checked){
                        $scope.selectedFilters.push(filter);
                    }else{
                        var index = $scope.selectedFilters.indexOf(filter);
                        $scope.selectedFilters.splice(index, 1);
                    }
                };

                $scope.getAllFiltersFromGroup = function(group){
                    return $scope.allFilters.filter(function(element){
                        return element.group === group;
                    });
                };

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-select.html";
                };

                init();
            }]
        };
    });