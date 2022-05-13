(function( $ ){

$(document).ready( function() {
    closePopup();
    
});

function closePopup(){
    $('.popup .ic-close').click( function(e) {
        e.preventDefault();
        $(this).parent().hide();
    });
}

})( jQuery );