(function( $ ){

$(document).ready( function() {
    booking_table();
    bonds_menu_mobile();
    closePopup();

    sortByNameOfTable();
    limitCharacterTextArea();
    requireValueForInput();
    placeHolderInputDate();
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

function limitCharacterTextArea(){

    $('.limit_line').each( function() {

        $(this).keyup( function() {

            var text = $(this).val().replace("\n", ""),
                $count_rows = $(this).val().split("\n").length,
                $val_character = $(this).val();
                

            if (text.length > 20) {

                var chunks = text.match(/.{1,20}/g);

                if (chunks.length > 20) { 
                    chunks.splice(20, chunks.length - 1);
                }

                $(this).val( chunks.join("\n") );
            }

            if( $val_character == '' ){
                $(this).siblings('.text-status').find('span').text(0);
            }else{
                $(this).siblings('.text-status').find('span').text( $count_rows );
            }
            
        });
    });

    $('.limit_character').each( function() {
        $(this).keyup( function() {
            var $limit_character = 300,
                $current_character = $(this).val().length,
                $character_remaining = $limit_character - $current_character;
            
            $(this).siblings('.text-status').find('span').text( $character_remaining );
        });
    });

}

function placeHolderInputDate(){
    $('input[type=time]').each( function() {
        $(this).on({
            blur(){
                if( $(this).val() ){
                    $(this).addClass('__has_value');
                }else{
                    $(this).removeClass('__has_value');
                }
            }
        });
    });
    
    $('input[name=delivery_time_last_a2]').on({
        blur(){
            if( $(this).val() ){
                $('input[name=delivery_window_from_a2]').attr('disabled', 'disabled');
                $('input[name=delivery_window_to_a2]').attr('disabled', 'disabled');

                $('input[name=delivery_window_to_a2]').parents('.bonds-field').addClass('disable');
            }else{
                $('input[name=delivery_window_from_a2]').removeAttr('disabled');
                $('input[name=delivery_window_to_a2]').removeAttr('disabled');

                $('input[name=delivery_window_to_a2]').parents('.bonds-field').removeClass('disable');
            }
        }
    });

    $('input[name=delivery_window_from_a2], input[name=delivery_window_to_a2]').on({
        blur(){
            if( $(this).val() ){
                $('input[name=delivery_time_last_a2]').attr('disabled', 'disabled');

                $('input[name=delivery_time_last_a2]').parents('.bonds-field').addClass('disable');
            }else{
                $('input[name=delivery_time_last_a2]').removeAttr('disabled');

                $('input[name=delivery_time_last_a2]').parents('.bonds-field').removeClass('disable');
            }
        }
    });

}

function requireValueForInput(){
    $('input.require').each( function() {
        var $label_field = $(this).prev().text(),
            $elm_note    = $('<p class="validate">you must enter a value for ' + $label_field +'</p>') ;

        $(this).keyup( function() {

            if( $(this).val() == '' ){
                $(this).parents('.bonds-field').addClass('warning');
                $(this).parents('.bonds-field').append($elm_note);
            }else{
                $(this).parents('.bonds-field').removeClass('warning');
                $(this).parents('.bonds-field').find('.validate').remove();
            }
        });

        $(this).on({
            blur(e){
                if( $(this).val() == '' ){
                    $(this).parents('.bonds-field').addClass('warning');
                    $(this).parents('.bonds-field').append($elm_note);
                }else{
                    $(this).parents('.bonds-field').removeClass('warning');
                    $(this).parents('.bonds-field').find('.validate').remove();
                }
            }
        });

    });
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