describe('Filter:propsFilter', function () {
	
	var $filter;
    
    beforeEach(module('AdminApp'));
    
	beforeEach(inject(function(_$filter_){
		$filter = _$filter_;
	}));
	
    
	it('ff', function () {
		var propsFilter = $filter('propsFilter');
        var items = [
            {name: 'binh', age: 12},
            {name: 'tam', age:15},
            {name: 'huong', age: 12}
        ];
        
        expect( propsFilter( items, {name: 'binh'} ).length ).toEqual(1);
	});
});
