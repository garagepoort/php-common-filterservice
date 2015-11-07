angular.module('com.bendani.php.common.filterservice', [])
.directive('filterParent', ['$scope', '$compile', function($scope, $compile){
    console.log("Directive was run");
    return {
        scope: {
            filter: "="
        },
        template: '<div></div>',
        restrict: 'E',
        link: function($scope, $elem){
            var htm = "";
            if($scope.filter.type === "boolean"){
                htm = '<filter-boolean filter="filter"></filter-boolean>';
            }
            if($scope.filter.type === "text"){
                htm = '<filter-text filter="filter"></filter-text>';
            }
            if($scope.filter.type === "multiselect"){
                htm = '<filter-multiselect filter="filter"></filter-multiselect>';
            }
            if($scope.filter.type === "number"){
                htm = '<filter-number filter="filter"></filter-number>';
            }
            if($scope.filter.type === "options"){
                htm = '<filter-options filter="filter"></filter-options>';
            }
            var compiled = $compile(htm)($scope);
            $elem.append(compiled);
        }
    }
}]);