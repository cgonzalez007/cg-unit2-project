$(function () {

    console.log("this is a test");

    /*Configurations for item dialog box*/
    var $itemDialog = $("#add-item").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Add": function () {
                $($itemDialog).submit();
            }, "Cancel": function () {
                $itemDialog.dialog("close");
            }
        },
        close: function () {
            $itemDialog.dialog("close");
        }
    });

    $(document).on('click', "a.add-btn", function () {
        $itemDialog.dialog("open");
        return false;
    });
});

