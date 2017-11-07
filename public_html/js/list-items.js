/* 
 * November 2017 Chris Gonzalez 
 */

$(function () {

    initFirebase();

    var $card = $('#card-template');

    /*Show Lunch Specials initially*/
    populate("lunch-specials", $card);
    
    $('.cat-link').click(function (e) {
        emptyItemsContent();
        populate(this.id, $card);
    });
 
});

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
                            + '<br></b>$' + childSnapshot.child("price").val().toFixed(2));
                    newCard.append('<a href="#" id="' + childSnapshot.child("number").val() + '" class="btn btn-default add-btn">Add</a>');
                    
                    $('#items').append(newCard);


                });
            });

}

function emptyItemsContent() {
    $('#cat-info').empty();
    $('#items').empty();
}