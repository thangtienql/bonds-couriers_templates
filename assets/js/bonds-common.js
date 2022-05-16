(function( $ ){

$(document).ready( function() {
    booking_table();
    bonds_menu_mobile();
    closePopup();

    sortByNameOfTable();
});

function booking_table(){
    $('.template-view table tbody tr').each( function() {
        
        var $field_checkbox = $(this).find('.select-item .checkbox input'),
            $option_permanent = $(this).find('.select_permanent .options li');
        

        $field_checkbox.change( function() {
            if( $(this).is(':checked')){
                $(this).parents('.select-item').siblings('.remove-item').removeClass('hide');
                $(this).parents('tr').addClass('clicked');
            }else{
                $(this).parents('.select-item').siblings('.remove-item').addClass('hide');
                $(this).parents('tr').removeClass('clicked');
            }
        });

        $option_permanent.click( function(e) {
            e.preventDefault();
            var $value = $(this).attr('rel');
            
            if( $value == 'permanent'){
                $(this).parent().siblings('.custom-select').addClass('changed');
            }else{
                $(this).parent().siblings('.custom-select').removeClass('changed');
            }
        });

    });
}

function sortByNameOfTable(){
    $('th#jobStatus').click(function(){
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    })
    function comparer(index) {
        return function(a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index){ return $(row).children('td').eq(index).text() }

}

function bonds_menu_mobile(){
    $('.toggle-menu-mobile').click( function() {
        $('.menu-col').toggleClass('active');
        $(this).toggleClass('active');
        $('.bonds-menu__nav').slideToggle();
        $('body').toggleClass('overflow-hidden');
    });
}

// Function Close Popup
function closePopup(){
    $('.popup .ic-close').click( function(e) {
        e.preventDefault();
        $(this).parent().hide();
    });
}

})( jQuery );