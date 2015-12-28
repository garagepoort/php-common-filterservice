angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterBoolean', function (){
        return {
            scope: {
                filter: "=filter"
            },
            restrict: "E",
            template: '<div ng-include="getTemplateUrl()"></div>',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {

                var yes = {key: 'Ja', value: true};
                var no = {key: 'Nee', value: false};

                var selectedValue;
                if($scope.filter.value !== undefined){
                    if($scope.filter.value){
                        selectedValue = yes;
                    }else{
                        selectedValue = no;
                    }
                }

                $scope.model = {
                    selected: selectedValue,
                    all: [yes, no]
                };


                $scope.onSelect = function(item){
                    $scope.filter.value = item.value;
                };

                $scope.getTemplateUrl = function(){
                    return $rootScope.baseUrl + "packages/bendani/php-common/filter-service/filter-boolean.html";
                }
            }]
        };
    });