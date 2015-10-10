function BooleanFilter(filterId, field){
    this.filterId = filterId;
    this.field = field;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

BooleanFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    formgroup.append("<label class='control-label col-md-10'>" + this.field + "</label>");
    formgroup.append(inputgroup);

    var input = $("<input class=\"filterInput\" type=\"checkbox\"/>");
    inputgroup.append(input);
    this.inputElement = input;
    this.formgroupElement = formgroup;
    input.bootstrapSwitch({
        size: "small",
        onText: "Ja",
        offText: "Nee",
    });
}

BooleanFilter.prototype.getValue = function(){
    if (this.inputElement.is(":checked")) {
        return true;
    } else {
        return false;
    }
}

BooleanFilter.prototype.setValue = function(value) {
    this.inputElement.prop("checked", value);
}

BooleanFilter.prototype.getSelectedOperator = function(){
    return 'equals';
}

BooleanFilter.prototype.setSelectedOperator = function(value){
}
function Filter(id, group, type, field, supportedOperators, options, onChange){
    this.id = id;
    this.type = type;
    this.field = field;
    this.group = group;
    this.supportedOperators = supportedOperators;
    this.options = options;
    this.onChange = onChange;
    this.filterValueInput;
    this.filterValueInputElement;
    this.filterSelectorElement;

    this.createSelectFilterElement();
    this.createFilterField();
}

Filter.prototype.createSelectFilterElement = function(){
    var container = $("<div></div>")
    var label = $("<label>" + this.field + "</label>");
    var input = $('<input type="checkbox" onchange="triggerSelectFilter(\'' + this.id + '\')"/>');
    input.attr('id', this.id);
    container.append(label);
    container.append(input);

    this.label = label;
    this.checkbox = input;
    this.filterSelectorElement = container;
};

function triggerSelectFilter(id) {
    var filter = FilterRepository.getFilter(id);
    filter.doSelect(filter.checkbox.is(":checked"));
}

Filter.prototype.doSelect = function(selected){
    this.checkbox.prop("checked", selected);
    this.onChange(this, selected);
}

Filter.prototype.setValue = function(value){
    this.filterValueInput.setValue(value);
}

Filter.prototype.isFilterSelected = function(){
    return this.checkbox.is(":checked");
}

Filter.prototype.getHtmlElement = function(){
    return this.filterSelectorElement;
}

Filter.prototype.removeFilterInputFromDom = function(){
    this.filterValueInputElement.remove();
}

Filter.prototype.getFilterValueInputElement = function(){
    return this.filterValueInputElement;
}

Filter.prototype.getFilterValue = function(){
    return this.filterValueInput.getValue();
}

Filter.prototype.getSelectedOperator = function(){
    return this.filterValueInput.getSelectedOperator();
}

Filter.prototype.setSelectedOperator = function(value){
    return this.filterValueInput.setSelectedOperator(value);
}



Filter.prototype.createFilterField = function() {
    var filterInput;
    if (this.type == "text") {
        filterInput = new TextFilter(this.id, this.field, this.supportedOperators);
    }
    if (this.type == "number") {
        filterInput = new NumberFilter(this.id, this.field, this.supportedOperators);
    }
    if (this.type == "boolean") {
        filterInput = new BooleanFilter(this.id, this.field);
    }

    if (this.type == "options") {
        filterInput = new OptionsFilter(this.id, this.field, this.supportedOperators, this.options);
    }

    if (this.type == "multiselect") {
        filterInput = new MultiSelectFilter(this.id, this.field, this.supportedOperators, this.options);
    }

    this.filterValueInput = filterInput;
    this.filterValueInputElement = filterInput.formgroupElement;
}
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
function MultiSelectFilter(filterId, field, operators, options){
    this.filterId = filterId;
    this.field = field;
    this.options = options;
    this.operators = operators;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

MultiSelectFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);

    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    var input = $("<select class=\"filterInput input-sm form-control\" multiple=\"multiple\"></select>");

    for (var option in this.options) {
        var optionEl = $('<option>' + option + '</option>');
        optionEl.attr('value', this.options[option]);
        input.append(optionEl);
    }


    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;

    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input")
        inputgroup.append(operatorSelect.createElement());
    }
    inputgroup.append(input);


    formgroup.append("<label class='control-label col-md-10'>" + this.field + "</label>");
    formgroup.append(inputgroup);
    input.multiselect({
        enableFiltering: true
    });
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

MultiSelectFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

MultiSelectFilter.prototype.setValue = function(value) {
    this.inputElement.multiselect("select", value);
}

MultiSelectFilter.prototype.getSelectedOperator = function(){
    return this.operatorSelector.getSelectedOperator();
}

MultiSelectFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}
function NumberFilter(filterId, placeholder, operators){
    this.filterId = filterId;
    this.placeholder = placeholder;
    this.operators = operators;
    this.inputElement;
    this.operatorSelector;
    this.formgroupElement;

    this.createFilterElement();
}

NumberFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    formgroup.append("<label class='control-label col-md-10'>" + this.placeholder + "</label>");
    formgroup.append(inputgroup);

    var input = $("<input class=\"form-control filterInput\" type=\"text\" placeholder=\"" + this.placeholder + "\"/>");

    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;
    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input");
        inputgroup.append(operatorSelect.createElement());
    }
    inputgroup.append(input);
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

NumberFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

NumberFilter.prototype.setValue = function(value) {
    this.inputElement.val(value);
}

NumberFilter.prototype.getSelectedOperator = function(){
    if(this.operatorSelector == undefined){
        return this.operators[Object.keys(this.operators)[0]];
    }
    return this.operatorSelector.getSelectedOperator();
}

NumberFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}

function NumberFilter(filterId,placeholder,operators){this.filterId=filterId;this.placeholder=placeholder;this.operators=operators;this.inputElement;this.operatorSelector;this.formgroupElement;this.createFilterElement()}NumberFilter.prototype.createFilterElement=function(){var formgroup=$('<div class="form-group"></div>');formgroup.attr("forFilter",this.filterId);var inputgroup=$('<div class="col-md-10 filter-input"></div>');formgroup.append("<label class='control-label col-md-10'>"+this.placeholder+"</label>");formgroup.append(inputgroup);var input=$('<input class="form-control filterInput" type="text" placeholder="'+this.placeholder+'"/>');var operatorSelect=new OperatorSelector(this.filterId,this.operators,input);this.operatorSelector=operatorSelect;if(Object.keys(this.operators).length>1){input.addClass("operator-input");inputgroup.append(operatorSelect.createElement())}inputgroup.append(input);this.inputElement=input;this.formgroupElement=formgroup};NumberFilter.prototype.getValue=function(){return this.inputElement.val()};NumberFilter.prototype.setValue=function(value){this.inputElement.val(value)};NumberFilter.prototype.getSelectedOperator=function(){if(this.operatorSelector==undefined){return this.operators[Object.keys(this.operators)[0]]}return this.operatorSelector.getSelectedOperator()};NumberFilter.prototype.setSelectedOperator=function(value){this.operatorSelector.setSelectedOperator(value)};
function OperatorSelector(filterId, operators, inputElement) {
    this.filterId = filterId;
    this.operators = operators;
    this.inputElement = inputElement;
}

OperatorSelector.prototype.createElement = function(){
    var operatorSelect = $('<select class="input-sm form-control operator-select"></select>');
    for (var option in this.operators) {
        var optionEl = $('<option>' + option + '</option>');
        optionEl.attr('value', this.operators[option]);
        operatorSelect.append(optionEl);
    }
    this.inputElement = operatorSelect;
    return operatorSelect;
}

OperatorSelector.prototype.getSelectedOperator = function() {
    return this.inputElement.val();
}

OperatorSelector.prototype.setSelectedOperator = function(value) {
    return this.inputElement.val(value);
}


function OptionsFilter(filterId, field, operators, options){
    this.filterId = filterId;
    this.field = field;
    this.options = options;
    this.operators = operators;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

OptionsFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    var input = $("<select class=\"filterInput input-sm form-control\"></select>");
    for (var option in this.options) {
        var optionEl = $('<option>' + option + '</option>');
        optionEl.attr('value', this.options[option]);
        input.append(optionEl);
    }

    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;
    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input")
        inputgroup.append(operatorSelect.createElement());
    }

    inputgroup.append(input);
    formgroup.append("<label class='control-label col-md-10'>" + this.field + "</label>");
    formgroup.append(inputgroup);
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

OptionsFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

OptionsFilter.prototype.setValue = function(value) {
    this.inputElement.val(value);
}

OptionsFilter.prototype.getSelectedOperator = function(){
    if(this.operatorSelector == undefined){
        return this.operators[Object.keys(this.operators)[0]];
    }
    return this.operatorSelector.getSelectedOperator();
}

OptionsFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}
function TextFilter(filterId, placeholder, operators){
    this.filterId = filterId;
    this.placeholder = placeholder;
    this.operators = operators;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

TextFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    formgroup.append("<label class='control-label col-md-10'>" + this.placeholder + "</label>");
    formgroup.append(inputgroup);

    var input = $("<input class=\"form-control filterInput\" type=\"text\" placeholder=\"" + this.placeholder + "\"/>");

    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;
    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input")
        inputgroup.append(operatorSelect.createElement());
    }
    inputgroup.append(input);
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

TextFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

TextFilter.prototype.getSelectedOperator = function(){
    if(this.operatorSelector == undefined){
        return this.operators[Object.keys(this.operators)[0]];
    }
    return this.operatorSelector.getSelectedOperator();
}

TextFilter.prototype.setValue = function(value) {
    this.inputElement.val(value);
}

TextFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}
function BooleanFilter(filterId, field){
    this.filterId = filterId;
    this.field = field;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

BooleanFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    formgroup.append("<label class='control-label col-md-10'>" + this.field + "</label>");
    formgroup.append(inputgroup);

    var input = $("<input class=\"filterInput\" type=\"checkbox\"/>");
    inputgroup.append(input);
    this.inputElement = input;
    this.formgroupElement = formgroup;
    input.bootstrapSwitch({
        size: "small",
        onText: "Ja",
        offText: "Nee",
    });
}

BooleanFilter.prototype.getValue = function(){
    if (this.inputElement.is(":checked")) {
        return true;
    } else {
        return false;
    }
}

BooleanFilter.prototype.setValue = function(value) {
    this.inputElement.prop("checked", value);
}

BooleanFilter.prototype.getSelectedOperator = function(){
    return 'equals';
}

BooleanFilter.prototype.setSelectedOperator = function(value){
}
function Filter(id, group, type, field, supportedOperators, options, onChange){
    this.id = id;
    this.type = type;
    this.field = field;
    this.group = group;
    this.supportedOperators = supportedOperators;
    this.options = options;
    this.onChange = onChange;
    this.filterValueInput;
    this.filterValueInputElement;
    this.filterSelectorElement;

    this.createSelectFilterElement();
    this.createFilterField();
}

Filter.prototype.createSelectFilterElement = function(){
    var container = $("<div></div>")
    var label = $("<label>" + this.field + "</label>");
    var input = $('<input type="checkbox" onchange="triggerSelectFilter(\'' + this.id + '\')"/>');
    input.attr('id', this.id);
    container.append(label);
    container.append(input);

    this.label = label;
    this.checkbox = input;
    this.filterSelectorElement = container;
};

function triggerSelectFilter(id) {
    var filter = FilterRepository.getFilter(id);
    filter.doSelect(filter.checkbox.is(":checked"));
}

Filter.prototype.doSelect = function(selected){
    this.checkbox.prop("checked", selected);
    this.onChange(this, selected);
}

Filter.prototype.setValue = function(value){
    this.filterValueInput.setValue(value);
}

Filter.prototype.isFilterSelected = function(){
    return this.checkbox.is(":checked");
}

Filter.prototype.getHtmlElement = function(){
    return this.filterSelectorElement;
}

Filter.prototype.removeFilterInputFromDom = function(){
    this.filterValueInputElement.remove();
}

Filter.prototype.getFilterValueInputElement = function(){
    return this.filterValueInputElement;
}

Filter.prototype.getFilterValue = function(){
    return this.filterValueInput.getValue();
}

Filter.prototype.getSelectedOperator = function(){
    return this.filterValueInput.getSelectedOperator();
}

Filter.prototype.setSelectedOperator = function(value){
    return this.filterValueInput.setSelectedOperator(value);
}



Filter.prototype.createFilterField = function() {
    var filterInput;
    if (this.type == "text") {
        filterInput = new TextFilter(this.id, this.field, this.supportedOperators);
    }
    if (this.type == "number") {
        filterInput = new NumberFilter(this.id, this.field, this.supportedOperators);
    }
    if (this.type == "boolean") {
        filterInput = new BooleanFilter(this.id, this.field);
    }

    if (this.type == "options") {
        filterInput = new OptionsFilter(this.id, this.field, this.supportedOperators, this.options);
    }

    if (this.type == "multiselect") {
        filterInput = new MultiSelectFilter(this.id, this.field, this.supportedOperators, this.options);
    }

    this.filterValueInput = filterInput;
    this.filterValueInputElement = filterInput.formgroupElement;
}
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
function MultiSelectFilter(filterId, field, operators, options){
    this.filterId = filterId;
    this.field = field;
    this.options = options;
    this.operators = operators;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

MultiSelectFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);

    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    var input = $("<select class=\"filterInput input-sm form-control\" multiple=\"multiple\"></select>");

    for (var option in this.options) {
        var optionEl = $('<option>' + option + '</option>');
        optionEl.attr('value', this.options[option]);
        input.append(optionEl);
    }


    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;

    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input")
        inputgroup.append(operatorSelect.createElement());
    }
    inputgroup.append(input);


    formgroup.append("<label class='control-label col-md-10'>" + this.field + "</label>");
    formgroup.append(inputgroup);
    input.multiselect({
        enableFiltering: true
    });
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

MultiSelectFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

MultiSelectFilter.prototype.setValue = function(value) {
    this.inputElement.multiselect("select", value);
}

MultiSelectFilter.prototype.getSelectedOperator = function(){
    return this.operatorSelector.getSelectedOperator();
}

MultiSelectFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}
function NumberFilter(filterId, placeholder, operators){
    this.filterId = filterId;
    this.placeholder = placeholder;
    this.operators = operators;
    this.inputElement;
    this.operatorSelector;
    this.formgroupElement;

    this.createFilterElement();
}

NumberFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    formgroup.append("<label class='control-label col-md-10'>" + this.placeholder + "</label>");
    formgroup.append(inputgroup);

    var input = $("<input class=\"form-control filterInput\" type=\"text\" placeholder=\"" + this.placeholder + "\"/>");

    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;
    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input");
        inputgroup.append(operatorSelect.createElement());
    }
    inputgroup.append(input);
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

NumberFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

NumberFilter.prototype.setValue = function(value) {
    this.inputElement.val(value);
}

NumberFilter.prototype.getSelectedOperator = function(){
    if(this.operatorSelector == undefined){
        return this.operators[Object.keys(this.operators)[0]];
    }
    return this.operatorSelector.getSelectedOperator();
}

NumberFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}

function NumberFilter(filterId,placeholder,operators){this.filterId=filterId;this.placeholder=placeholder;this.operators=operators;this.inputElement;this.operatorSelector;this.formgroupElement;this.createFilterElement()}NumberFilter.prototype.createFilterElement=function(){var formgroup=$('<div class="form-group"></div>');formgroup.attr("forFilter",this.filterId);var inputgroup=$('<div class="col-md-10 filter-input"></div>');formgroup.append("<label class='control-label col-md-10'>"+this.placeholder+"</label>");formgroup.append(inputgroup);var input=$('<input class="form-control filterInput" type="text" placeholder="'+this.placeholder+'"/>');var operatorSelect=new OperatorSelector(this.filterId,this.operators,input);this.operatorSelector=operatorSelect;if(Object.keys(this.operators).length>1){input.addClass("operator-input");inputgroup.append(operatorSelect.createElement())}inputgroup.append(input);this.inputElement=input;this.formgroupElement=formgroup};NumberFilter.prototype.getValue=function(){return this.inputElement.val()};NumberFilter.prototype.setValue=function(value){this.inputElement.val(value)};NumberFilter.prototype.getSelectedOperator=function(){if(this.operatorSelector==undefined){return this.operators[Object.keys(this.operators)[0]]}return this.operatorSelector.getSelectedOperator()};NumberFilter.prototype.setSelectedOperator=function(value){this.operatorSelector.setSelectedOperator(value)};
function OperatorSelector(filterId, operators, inputElement) {
    this.filterId = filterId;
    this.operators = operators;
    this.inputElement = inputElement;
}

OperatorSelector.prototype.createElement = function(){
    var operatorSelect = $('<select class="input-sm form-control operator-select"></select>');
    for (var option in this.operators) {
        var optionEl = $('<option>' + option + '</option>');
        optionEl.attr('value', this.operators[option]);
        operatorSelect.append(optionEl);
    }
    this.inputElement = operatorSelect;
    return operatorSelect;
}

OperatorSelector.prototype.getSelectedOperator = function() {
    return this.inputElement.val();
}

OperatorSelector.prototype.setSelectedOperator = function(value) {
    return this.inputElement.val(value);
}


function OptionsFilter(filterId, field, operators, options){
    this.filterId = filterId;
    this.field = field;
    this.options = options;
    this.operators = operators;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

OptionsFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    var input = $("<select class=\"filterInput input-sm form-control\"></select>");
    for (var option in this.options) {
        var optionEl = $('<option>' + option + '</option>');
        optionEl.attr('value', this.options[option]);
        input.append(optionEl);
    }

    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;
    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input")
        inputgroup.append(operatorSelect.createElement());
    }

    inputgroup.append(input);
    formgroup.append("<label class='control-label col-md-10'>" + this.field + "</label>");
    formgroup.append(inputgroup);
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

OptionsFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

OptionsFilter.prototype.setValue = function(value) {
    this.inputElement.val(value);
}

OptionsFilter.prototype.getSelectedOperator = function(){
    if(this.operatorSelector == undefined){
        return this.operators[Object.keys(this.operators)[0]];
    }
    return this.operatorSelector.getSelectedOperator();
}

OptionsFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}
function TextFilter(filterId, placeholder, operators){
    this.filterId = filterId;
    this.placeholder = placeholder;
    this.operators = operators;
    this.inputElement;
    this.formgroupElement;

    this.createFilterElement();
}

TextFilter.prototype.createFilterElement = function(){
    var formgroup = $("<div class=\"form-group\"></div>");
    formgroup.attr("forFilter", this.filterId);
    var inputgroup = $("<div class=\"col-md-10 filter-input\"></div>");

    formgroup.append("<label class='control-label col-md-10'>" + this.placeholder + "</label>");
    formgroup.append(inputgroup);

    var input = $("<input class=\"form-control filterInput\" type=\"text\" placeholder=\"" + this.placeholder + "\"/>");

    var operatorSelect = new OperatorSelector(this.filterId, this.operators, input);
    this.operatorSelector = operatorSelect;
    if (Object.keys(this.operators).length > 1) {
        input.addClass("operator-input")
        inputgroup.append(operatorSelect.createElement());
    }
    inputgroup.append(input);
    this.inputElement = input;
    this.formgroupElement = formgroup;
}

TextFilter.prototype.getValue = function(){
    return this.inputElement.val();
}

TextFilter.prototype.getSelectedOperator = function(){
    if(this.operatorSelector == undefined){
        return this.operators[Object.keys(this.operators)[0]];
    }
    return this.operatorSelector.getSelectedOperator();
}

TextFilter.prototype.setValue = function(value) {
    this.inputElement.val(value);
}

TextFilter.prototype.setSelectedOperator = function(value){
    this.operatorSelector.setSelectedOperator(value);
}