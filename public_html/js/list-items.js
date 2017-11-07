/* 
 * November 2017 Chris Gonzalez 
 */

$(function () {

    initFirebase();
    // template for displaying items on page
    var $card = $('#card-template');

    /*Show Lunch Specials initially*/
    populate("lunch-specials", $card);
    //based on id of nav link being clicked, the items of the specified category will be 
    //displayed
    $('.cat-link').click(function (e) {
        emptyItemsContent();
        populate(this.id, $card);
    });
 
});
/**
 * Initialize Firebase
 * @returns {undefined}
 */
function initFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDrbbjK0tYP8IvpjoM3pCOHMvtFV_Gnm3s",
        authDomain: "cg-unit2-project.firebaseapp.com",
        databaseURL: "https://cg-unit2-project.firebaseio.com",
        projectId: "cg-unit2-project",
        storageBucket: "cg-unit2-project.appspot.com",
        messagingSenderId: "302302304461"
    };
    firebase.initializeApp(config);
}
/**
 * populate 
 * @param {type} id element id of nav link being clicked to access items of a specific 
 * category. The ids of the category nav links match the child names of categories stored in the
 * firebase DB.
 * @param {type} emptyCard bootstrap card used for displaying items on a page 
 * @returns {undefined} 
 */
function populate(id, emptyCard) {   
    $("#cat-type").val(id);
    var query1 = firebase.database().ref("site/categories/"+ id);
    query1.once("value")
            .then(function (snapshot) {
                $('#cat-info').html("<b>" + snapshot.child("cat-name").val() + "</b><br><br>" +  snapshot.child("description").val());
            });

    var query2 = firebase.database().ref("site/categories/" + id + "/items");

    query2.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    var newCard = emptyCard.clone().show().removeAttr('id');

                    newCard.find('img').attr("src", childSnapshot.child("img-src").val()).attr('alt', childSnapshot.child("name").val());
                    newCard.find('h4.card-title').html('<br><b>' + childSnapshot.child("name").val() + ' ' + '(' + '#' + childSnapshot.child("number").val() + ')'
                            + '<br></b>' + (childSnapshot.child("price").val() !== 0.00 ? '$' + childSnapshot.child("price").val().toFixed(2) : ""));
                    newCard.append('<a href="#" id="' + childSnapshot.child("number").val() + '" class="btn btn-default add-btn">Add</a>');
                    
                    $('#items').append(newCard);


                });
            });

}
/**
 * Simply make these elements empty for next category to be displayed.
 * @returns {undefined}
 */
function emptyItemsContent() {
    $('#cat-info').empty();
    $('#items').empty();
}