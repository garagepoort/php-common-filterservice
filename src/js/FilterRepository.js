function FilterRepository() {
}
FilterRepository.filters = [];

FilterRepository.getFilter = function (id) {
    return FilterRepository.filters[id];
};

FilterRepository.addFilter = function (id, filter) {
    FilterRepository.filters[id] = filter;
};

FilterRepository.getFilters = function () {
    return FilterRepository.filters;
};

FilterRepository.createJson = function () {
    var filters = [];
    for (var filter in  FilterRepository.filters) {
        var filterObject = FilterRepository.filters[filter];

        if(filterObject.isFilterSelected()){
            filters.push({
                id: filterObject.id,
                value: filterObject.getFilterValue(),
                operator: filterObject.getSelectedOperator()
            });
        }
    }
    return filters;
}

FilterRepository.fillFilterRepository =  function(filters, onSelectCallback) {
    for (var f in filters) {
        var filter = filters[f];
        var filterId = filter.id;
        var filterGroup = filter.group;
        var filterType = filter.type;
        var filterField = filter.field;
        var filterOperators = filter.supportedOperators;
        var filterOptions = [];

        if (filter.options != undefined) {
            filterOptions = filter.options;
        }

        var filter = new Filter(filterId, filterGroup, filterType, filterField, filterOperators, filterOptions, onSelectCallback);

        FilterRepository.addFilter(filterId, filter);
    }
}