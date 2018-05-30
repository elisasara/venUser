// <!-- Getting the value of the checked radio buttons -->
$("input:radio[class=modeClass]").click(function () {
    var value = $(this).val();
    if (value == "Text box") {
        $("#radio_form").show();
        $("#text_form").hide();
        /* console.log("Time to call input box");*/
    }
    if (value == "Radio buttons") {
       $("#radio_form").hide();
        $("#text_form").show();

    }
});