/* 
 * November 2017 Chris Gonzalez 
 */

$(function () {

    initFirebase();

    var $card = $('#card-template');

    /*Show Lunch Specials initially*/
    populateLunchSpecials($card);

    $('#lunch-specials').click(function (e) {
        emptyItemsContent();
        populateLunchSpecials($card);
    });

    $('#special-combo-platter').click(function (e) {
        emptyItemsContent();
        populateSpecialComboPlatters($card);
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

function populateLunchSpecials(emptyCard) {

    var query1 = firebase.database().ref("site/categories/lunch-specials");
    query1.once("value")
            .then(function (snapshot) {
                $('#cat-info').html(snapshot.child("description").val());
            });

    var query2 = firebase.database().ref("site/categories/lunch-specials/items");

    query2.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    var newCard = emptyCard.clone().show();

                    newCard.find('img').attr("src", childSnapshot.child("img-src").val()).attr('alt', childSnapshot.child("name").val());
                    newCard.find('h4.card-title').html('<br><b>' + childSnapshot.child("name").val() + ' ' + '(' + 'L.' + childSnapshot.child("number").val() + ')'
                            + '<br></b>$' + childSnapshot.child("price").val().toFixed(2));

                    $('#items').append(newCard);


                });
            });

}

function populateSpecialComboPlatters(emptyCard) {
    var query1 = firebase.database().ref("site/categories/special-combo-platter");
    query1.once("value")
            .then(function (snapshot) {
                $('#cat-info').html(snapshot.child("description").val());
            });

}

function emptyItemsContent() {
    $('#cat-info').empty();
    $('#items').empty();
}