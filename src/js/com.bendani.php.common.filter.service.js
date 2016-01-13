angular
    .module('com.bendani.php.common.filterservice')
    .factory('FilterService', [function FilterServiceProvider() {

        var selectedFilters = [];
        var allFilters = [];
        var handlers = [];

        var setAllFilters = function(filters){
            allFilters = filters;
            triggerHandlers();
        };

        var getAllFilters = function(){
            return allFilters;
        };

        var setSelectedFilters = function(filters){
            selectedFilters = filters;
            triggerHandlers();
        };

        var getSelectedFilters = function(){
            return selectedFilters;
        };

        var unselectFilter = function(filter){
            for(var i=0; i < selectedFilters.length; i++) {
                if( selectedFilters[i].id == filter.id){
                    selectedFilters.splice(i,1);
                }
            }
            triggerHandlers();
        };

        var selectFilter = function(filter){
            var contains = false;
            for(var i=0; i < selectedFilters.length; i++) {
                if( selectedFilters[i].id == filter.id){
                    contains = true;
                }
            }
            if(!contains){
                selectedFilters.push(filter);
                triggerHandlers();
            }
        };

        var isFilterSelected = function(filter){
            var index = selectedFilters.indexOf(filter);
            return index > -1;
        };

        var filter = function(callback){
            callback(convertFiltersToJson(selectedFilters));
        };

        var registerHandler = function(handler) {
            handlers.push(handler);
        };

        var deregisterHandler = function(handler) {
            var index  = handlers.indexOf(handler);
            if(index > -1){
                handlers.splice(index, 1);
            }
        };

        var convertFiltersToJson = function(){
            var result = [];
            for (var i = 0; i < selectedFilters.length; i++) {
                var filterObject = selectedFilters[i];

                if(validateFilter(filterObject)){
                    var newFilter = {
                        id: filterObject.id,
                        value: filterObject.value
                    };

                    if(filterObject.selectedOperator){
                        newFilter.operator = filterObject.selectedOperator.value;
                    }

                    result.push(newFilter);
                }
            }

            return result;
        };

        function triggerHandlers() {
            _.each(handlers, function (handler) {
                handler(allFilters, selectedFilters);
            });
        }

        function validateFilter(filter){
            if(filter.value === undefined || filter.value === null){
                return false;
            }

            if(filter.type === 'date'){
                if(!filter.value || !filter.value.from){
                    return false;
                }
            }
            if(filter.type === 'multiselect'){
                if(!filter.value || filter.value.length === 0){
                    return false;
                }
            }
            return true;
        }
        return {
            getAllFilters : getAllFilters,
            setAllFilters : setAllFilters,
            getSelectedFilters : getSelectedFilters,
            setSelectedFilters : setSelectedFilters,
            unselectFilter : unselectFilter,
            selectFilter : selectFilter,
            registerHandler : registerHandler,
            deregisterHandler : deregisterHandler,
            isFilterSelected: isFilterSelected,
            convertFiltersToJson: convertFiltersToJson,
            filter: filter
        };

    }]);