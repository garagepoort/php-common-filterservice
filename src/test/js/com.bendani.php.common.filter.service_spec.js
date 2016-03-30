describe('com.bendani.php.common.filter.service', function(){

    var bankAccountNumberFormatService;

    beforeEach(function(){
        module('com.bendani.php.common.filter.service', function() {
        });

        inject(function (_bankAccountNumberFormatService_) {
            bankAccountNumberFormatService = _bankAccountNumberFormatService_;
        });
    });

    describe('registerFilterService', function(){
        it('should create filter service with id', function(){

        });
    });
});