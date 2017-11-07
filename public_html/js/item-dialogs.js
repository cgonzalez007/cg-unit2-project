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

    /*Configurations for item dialog box*/
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
     * 
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
            
            if (snapshot.child("size").val() !== null) {
                $sizeOption.show();
                snapshot.child("size").forEach(function (option) {
                    var newOption = $sizeOptionTemplate.clone().switchClass('template', 'non-template').removeAttr('id');
                    newOption.find("input").val(option.val()).after('<label>&nbsp;' + option.key + ' for ' + option.val() + '</label>');
                    $sizeOption.append(newOption.show());
                });
            }

        });
        $itemDialog.dialog("open");
        return false;
    });
    
    //testing purposes...
    console.log(Cookies.getJSON("items"));
    
});

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
function resetInputs(){
    $('#qty').val("1");
    $("#name").val("");
    $("#comments").val("");
}