$(function () {
    /**
     * Navigation
     */
    $('#continue-guest-btn').on('click', function () {
        $('#login-register-step').fadeOut(500, function () {
            $('#order-info-step').fadeIn(1500);
        });

    });
    /**
     * The "Last Step" will have the user confirm the items included in the 
     * order. 
     */
    $('#review-order-btn').on('click', function () {
        $('#order-info-step').fadeOut(500, function () {
            $('#last-step').fadeIn(1500);
        });
        
        var items = Cookies.getJSON("items");
        
        var total = 0.00;
        items.forEach(function(item, index){
            total += parseFloat(item.itemPrice) * item.qty;
            $('#items').append('<tr class="h4"><td><b>' 
                    + item.itemName 
                    + ' ' 
                    + (item.qty > 1 ? 'X ' + item.qty : "") + '</b> ' 
                    + '</td>' 
                    + '<td>$' + (parseFloat(item.itemPrice) * item.qty).toFixed(2) + '</td></tr>' //total
                    + (item.rice !== 'na' ? '<tr><td colspan="2">&nbsp;&nbsp;Rice: ' + item.rice + '</td></tr>': "") 
                    + (item.meat !== 'na' ? '<tr><td colspan="2">&nbsp;&nbsp;Meat: ' + item.meat + '</td></tr>': "") 
                    + (item.side !== 'na' ? '<tr><td colspan="2">&nbsp;&nbsp;Side: ' + item.side + '</td></tr>': "") 
                    + (item.size !== 'na' ? '<tr><td colspan="2">&nbsp;&nbsp;Size: ' + item.size + '</td></tr>': ""));
        });
        
        $('#total').html('Total: $' + total.toFixed(2));
        
        Cookies.remove("items");
    });

    /*Click to go back from order info step to login register step*/
    $('#back-to-login-register-anchor').on('click', function () {
        $('#order-info-step').fadeOut(500, function () {
            $('#login-register-step').fadeIn(1500);
        });

    });
    /*Click to go back from final step to order info step*/
    $('#back-to-order-info-anchor').on('click', function () {
        $('#last-step').fadeOut(500, function () {
            $('#order-info-step').fadeIn(1500);
        });

    });

});



