$(function () {
    // no items added to order yet...
    $('#im-done-btn').on('click', function (e) {
        if (Cookies.getJSON("items") === undefined) {
            e.preventDefault();            
        }
    });
    
    $('#')

});
