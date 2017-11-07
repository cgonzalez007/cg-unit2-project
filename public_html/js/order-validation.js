$(function () {

    $('#im-done-btn').on('click', function (e) {
        if (Cookies.getJSON("items") === undefined) {
            e.preventDefault();
            
        }
    });

});
