$(function () {

    var $riceOption = $('#rice');
    var $meatOption = $('#meat');
    var $sideOption = $('#side');
    var $additionalOption = $('.additional-option');
    
    var $meatOptionTemplate = $('#meat-option-template');
    var $sideOptionTemplate = $('#side-option-template');
    var $riceOptionTemplate = $('#rice-option-template');

    /*Configurations for item dialog box*/
    var $itemDialog = $("#add-item").dialog({
        autoOpen: false,
        height: 620,
        width: 350,
        modal: true,
        buttons: {
            "Add": function () {
                $($itemDialog).submit();
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
     * For "Lunch special items:"
     */
    $(document).on('click', "a.lunch-special.add-btn", function (e) {
        var query1 = firebase.database().ref("site/categories/lunch-specials");
        query1.on("value", function (snapshot) {
            
            if (snapshot.child("rice").val() !== null) {
                $riceOption.show();
                snapshot.child("rice").forEach(function (option) {
                    var newOption = $riceOptionTemplate.clone().switchClass('template','non-template');
                    newOption.find("input").val(option.val()).after('<label>&nbsp;'+ option.val() +'</label>');
                    $riceOption.append(newOption.show());
                });
            }
            
            if (snapshot.child("items").child(e.target.id).child("meat").val() !== null) {
                $meatOption.show();
                snapshot.child("items").child(e.target.id).child("meat").forEach(function (option) {
                    var newOption = $meatOptionTemplate.clone().switchClass('template','non-template');
                    newOption.find("input").val(option.val()).after('<label>&nbsp;'+ option.val() +'</label>');
                    $meatOption.append(newOption.show());
                });
            }
            
            if (snapshot.child("sides").val() !== null) {
                $sideOption.show();
                snapshot.child("sides").forEach(function (option) {
                    var newOption = $sideOptionTemplate.clone().switchClass('template','non-template');
                    newOption.find("input").val(option.val()).after('<label>&nbsp;'+ option.val() +'</label>');
                    $sideOption.append(newOption.show());
                });
            }
            
        });
        $itemDialog.dialog("open");
        return false;
    });
    /**
     * For "Special Combo platter" items:"
     */
    $(document).on('click', "a.special-combo-platter.add-btn", function () {
        var query1 = firebase.database().ref("site/categories/special-combo-platter");
        query1.once("value")
                .then(function (snapshot) {

                });
        $itemDialog.dialog("open");
        return false;
    });
    /**
     * For "Chef's Specialties" items:"
     */
    $(document).on('click', "a.chefs-specialties.add-btn", function () {
        var query1 = firebase.database().ref("site/categories/special-combo-platter");
        query1.once("value")
                .then(function (snapshot) {
                    $('#cat-info').html(snapshot.child("description").val());
                });
        $itemDialog.dialog("open");
        return false;
    });
});
