angular
    .module('com.bendani.php.common.filterservice')
    .factory('FilterService', [function FilterServiceProvider() {

        var registeredFilterServices = {};

        var registerFilterService = function(filterServiceId){
            if(!isFilterRegistered(filterServiceId)){
                registeredFilterServices[filterServiceId] = {
                    selectedFilters: [],
                    allFilters: [],
                    handlers: []
                };
            }
        };

        var setAllFilters = function(id, filters){
            if(isFilterRegistered(id)){
                registeredFilterServices[id].allFilters = filters;
                triggerHandlers(id);
            }
        };

        var getAllFilters = function(id){
            if(isFilterRegistered(id)) {
                return registeredFilterServices[id].allFilters;
            }
        };

        var setSelectedFilters = function(id, filters){
            if(isFilterRegistered(id)) {
                registeredFilterServices[id].selectedFilters = filters;
                triggerHandlers(id);
            }
        };

        var getSelectedFilters = function(id){
            if(isFilterRegistered(id)) {
                return registeredFilterServices[id].selectedFilters;
            }
        };

        var unselectFilter = function(id, filter){
            if(isFilterRegistered(id)) {
                for (var i = 0; i < registeredFilterServices[id].selectedFilters.length; i++) {
                    if (registeredFilterServices[id].selectedFilters[i].id == filter.id) {
                        registeredFilterServices[id].selectedFilters.splice(i, 1);
                    }
                }
                triggerHandlers(id);
            }
        };

        var selectFilter = function(id, filter){
            if(isFilterRegistered(id)) {
                var contains = false;
                for (var i = 0; i < registeredFilterServices[id].selectedFilters.length; i++) {
                    if (registeredFilterServices[id].selectedFilters[i].id == filter.id) {
                        contains = true;
                    }
                }
                if (!contains) {
                    registeredFilterServices[id].selectedFilters.push(filter);
                    triggerHandlers(id);
                }
            }
        };

        var isFilterSelected = function(id, filter){
            if(isFilterRegistered(id)) {
                var index = registeredFilterServices[id].selectedFilters.indexOf(filter);
                return index > -1;
            }
        };

        var filter = function(id, callback){
            if(isFilterRegistered(id)) {
                callback(convertFiltersToJson(id));
            }
        };

        var registerHandler = function(id, handler) {
            if(isFilterRegistered(id)) {
                registeredFilterServices[id].handlers.push(handler);
            }
        };

        var deregisterHandler = function(id, handler) {
            var index  = registeredFilterServices[id].handlers.indexOf(handler);
            if(index > -1){
                registeredFilterServices[id].handlers.splice(index, 1);
            }
        };

        var convertFiltersToJson = function(id){
            var result = [];
            if(registeredFilterServices[id].selectedFilters){
                for (var i = 0; i < registeredFilterServices[id].selectedFilters.length; i++) {
                    var filterObject = registeredFilterServices[id].selectedFilters[i];

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
            }

            return result;
        };

        function triggerHandlers(id) {
            _.each(registeredFilterServices[id].handlers, function (handler) {
                handler(registeredFilterServices[id].allFilters, registeredFilterServices[id].selectedFilters);
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

        function isFilterRegistered(filterServiceId){
            return !!registeredFilterServices[filterServiceId];
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
            registerFilterService: registerFilterService,
            filter: filter
        };

    }]);