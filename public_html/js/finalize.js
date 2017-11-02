$(function () {

    $('#continue-guest-btn').on('click', function () {
        $('#login-register-step').fadeOut(1000, function () {
            $('#order-info-step').fadeIn(3000);
        });

    });

    $('#continue-to-last-step-btn').on('click', function () {
        $('#order-info-step').fadeOut(1000, function () {
            $('#last-step').fadeIn(3000);
        });

    });

    /*Clicks to go back to previous steps*/
    $('#back-to-login-register-anchor').on('click', function () {
        $('#order-info-step').fadeOut(1000, function () {
            $('#login-register-step').fadeIn(3000);
        });

    });

    $('#back-to-order-info-anchor').on('click', function () {
        $('#last-step').fadeOut(1000, function () {
            $('#order-info-step').fadeIn(3000);
        });

    });

});

