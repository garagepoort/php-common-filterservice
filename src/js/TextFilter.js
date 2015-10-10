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