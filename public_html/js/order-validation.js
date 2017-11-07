/**
 * Validation for ordering process (more in particular, adding items to an order)
 * @returns {undefined}
 */
$(function () {
    // no items added to order yet... Don't check out if this is the case
    $('#im-done-btn').on('click', function (e) {
        if (Cookies.getJSON("items") === undefined) {
            e.preventDefault();            
        }
    });    
});
