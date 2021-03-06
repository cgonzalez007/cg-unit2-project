$(function () {

    var $riceOption = $('#rice');
    var $meatOption = $('#meat');
    var $sideOption = $('#side');
    var $sizeOption = $('#size');

    var $additionalOption = $('.additional-option');

    var $meatOptionTemplate = $('#meat-option-template');
    var $sideOptionTemplate = $('#side-option-template');
    var $riceOptionTemplate = $('#rice-option-template');
    var $sizeOptionTemplate = $('#size-option-template');

    /*Configurations for item dialog box used for adding an item to an order*/
    var $itemDialog = $("#add-item").dialog({
        autoOpen: false,
        height: 620,
        width: 350,
        modal: true,
        buttons: {
            "Add": function () {
                addItemToOrder();
                $itemDialog.dialog("close");
                $('.non-template').remove();
                $additionalOption.hide();
            }, "Cancel": function () {
                $itemDialog.dialog("close");
                $('.non-template').remove();
                $additionalOption.hide();
            }
        },
        close: function () {
            $itemDialog.dialog("close");
            $('.non-template').remove();
            $additionalOption.hide();
        }
    });
    /**
     * Add an item to an order. Based on current item category set, this event handler will 
     * Set the appropriate fields required for adding an item to one's order (rice, side, meat)
     * 
     * NOTE: Size currently not configured
     */
    $(document).on('click', "a.add-btn", function (e) {
        var query1 = firebase.database().ref("site/categories/" + $("#cat-type").val());
        query1.on("value", function (snapshot) {
            //set item category, item number, and item name in hidden input values
            $('#item-category').val(snapshot.key);
            $('#item-name').val(snapshot.child("items").child(e.target.id).child("name").val());
            $('#item-price').val(snapshot.child("items").child(e.target.id).child("price").val());
            $('#item-number').val(e.target.id);

            if (snapshot.child("rice").val() !== null) {
                $riceOption.show();
                snapshot.child("rice").forEach(function (option) {
                    var newOption = $riceOptionTemplate.clone().switchClass('template', 'non-template').removeAttr('id');
                    newOption.find("input").val(option.val()).after('<label>&nbsp;' + option.val() + '</label>');
                    $riceOption.append(newOption.show());
                });
            }

            if (snapshot.child("items").child(e.target.id).child("meat").val() !== null) {
                $meatOption.show();
                snapshot.child("items").child(e.target.id).child("meat").forEach(function (option) {
                    var newOption = $meatOptionTemplate.clone().switchClass('template', 'non-template').removeAttr('id');
                    newOption.find("input").val(option.val()).after('<label>&nbsp;' + option.val() + '</label>');
                    $meatOption.append(newOption.show());
                });
            }

            if (snapshot.child("sides").val() !== null) {
                $sideOption.show();
                snapshot.child("sides").forEach(function (option) {
                    var newOption = $sideOptionTemplate.clone().switchClass('template', 'non-template').removeAttr('id');
                    newOption.find("input").val(option.val()).after('<label>&nbsp;' + option.val() + '</label>');
                    $sideOption.append(newOption.show());
                });
            }
            // Sizing not configured yet... 11/7
//            if (snapshot.child("size").val() !== null) {
//                $sizeOption.show();
//                snapshot.child("size").forEach(function (option) {
//                    var newOption = $sizeOptionTemplate.clone().switchClass('template', 'non-template').removeAttr('id');
//                    newOption.find("input").val(option.val()).after('<label>&nbsp;' + option.key + ' for ' + option.val() + '</label>');
//                    $sizeOption.append(newOption.show());
//                });
//            }

        });
        $itemDialog.dialog("open");
        return false;
    });

    //testing purposes...
    console.log(Cookies.getJSON("items"));

});
/**
 * Add item to an order (Storing in Cookie), based on current inputs on item form
 * @returns 
 */
function addItemToOrder() {

    var addedItem = {
        "itemNumber": $("#item-number").val(),
        "itemName": $("#item-name").val(),
        "itemCategory": $("#item-category").val(),
        "itemPrice": $("#item-price").val(),
        "rice": $('input[name=rice-option]:checked').val() !== undefined ? $('input[name=rice-option]:checked').val() : "na",
        "meat": $('input[name=meat-option]:checked').val() !== undefined ? $('input[name=meat-option]:checked').val() : "na",
        "side": $('input[name=side-option]:checked').val() !== undefined ? $('input[name=side-option]:checked').val() : "na",
        "size": $('input[name=size-option]:checked').val() !== undefined ? $('input[name=size-option]:checked').val() : "na",
        "qty": $('#qty').val(),
        "name": $("#name").val(),
        "comments": $("#comments").val()
    };


    if (Cookies.getJSON("items") === undefined) {
        Cookies.set("items", [addedItem], {expires: 7});
    } else {
        var retrieved = Cookies.getJSON("items");
        retrieved.push(addedItem);
        Cookies.set("items", retrieved, {expires: 7});
    }
    // resetting default inputs (name, qty, comments)
    resetInputs();

    // for testing purposes
    console.log(Cookies.getJSON("items"));

}
// reset default inputs (name, qty, comments)
function resetInputs() {
    $('#qty').val("1");
    $("#name").val("");
    $("#comments").val("");
}
/**
 * First vers of function for deleting an item stored in the browser for order
 * items.
 * @param {type} indexToDelete index value to be used for deleting the item in the array that 
 * gets stored as a cookie.
 * @returns {undefined}
 */
function deleteItemFromOrder(indexToDelete) {
    var retrievedItems = Cookies.getJSON("items");

    retrievedItems.forEach(function (item, index) {
        if (index === indexToDelete) {
            delete retrievedItems[index];
        }
    });

    var newItems = [];

    retrievedItems.forEach(function (item, index) {
        if (retrievedItems[index] !== null) {
            newItems.push(retrievedItems[index]);
        }
    });
    // Check if nothing as been added (All items deleted)
    if (newItems[0] !== undefined) {
        Cookies.set("items", newItems, {expires: 7});
    } else {
        Cookies.remove("items");
    }

}