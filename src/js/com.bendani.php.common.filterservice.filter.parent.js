angular
    .module('com.bendani.php.common.filterservice')
    .directive('filterParent', ['$compile', function ($compile) {
        return {
            scope: {
                filter: "=",
                onRemove: '&'
            },
            template: '<div></div>',
            restrict: 'E',
            link: function ($scope, $elem) {
                var htm = "";
                if ($scope.filter.type === "boolean") {
                    htm = '<filter-boolean filter="filter" on-remove="onRemove(filter)"></filter-boolean>';
                }
                if ($scope.filter.type === "text") {
                    htm = '<filter-text filter="filter" on-remove="onRemove(filter)"></filter-text>';
                }
                if ($scope.filter.type === "multiselect") {
                    htm = '<filter-multiselect filter="filter" on-remove="onRemove(filter)"></filter-multiselect>';
                }
                if ($scope.filter.type === "number") {
                    htm = '<filter-number filter="filter" on-remove="onRemove(filter)"></filter-number>';
                }
                if ($scope.filter.type === "options") {
                    htm = '<filter-options filter="filter" on-remove="onRemove(filter)"></filter-options>';
                }
                var compiled = $compile(htm)($scope);
                $elem.append(compiled);
            }
        }
    }]);