/* 
 * November 2017 Chris Gonzalez 
 */
$(function () {
    $('#menu-accordion').accordion({
        collapsible: true,
        heightStyle: "content"
    });

    initFirebase();

    populateLunchSpecials();

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

function populateLunchSpecials() {
    var $lunchSpecials = $('#lunch-specials');

    var ref = firebase.database().ref("site/lunch-specials");

    ref.orderByChild('number')
    .once('value', function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
//
//            var value = childSnapshot.val();                       
//            
//            $lunchSpecials.append("<li></li>").html(value.name);
        });
               
    });        
}