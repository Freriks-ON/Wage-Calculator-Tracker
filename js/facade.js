$(document).ready(function(){
CFupdateTypeDropdown();
Top();
var SelectedReviewId;
});


function CFupdateTypeDropdown() {
    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            // both will work
            // var row = results.rows.item(i);
            var row = results.rows[i];

            console.info("Id: " + row['id'] +
                " Name: " + row['name']);

            htmlCode += `<option value="${row['id']}">${row['name']}</option>`;
            document.getElementById('CFCboType').innerHTML = htmlCode;
        }
    }

    Type.selectAll(options, callback);
}
function SetReview(value){
    SelectedReviewId = value;
    loadreview();
}
function loadreview(){
    var options = [SelectedReviewId];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var rating = false;
            // both will work
            // var row = results.rows.item(i);
            var row = results.rows[i];
            document.getElementById('CFModBuisnessName').value = row['buisinessName'];
            $('#CFCboModType').val(row['typeId']);
            document.getElementById('CFModReviewerEmail').value = row['reviewerEmail'];
            document.getElementById('CFModReviewerComments').value = row['reviewerComments'];
            document.getElementById('CFModReviewDate').value = row['reviewDate'];
            if(JSON.parse(row['hasRating']) == true){
                rating = true;
                console.log("1");
            }
            $("#CFModAdRate").prop( "checked", rating);
            ModRatings($("#CFModAdRate"));
            if(rating == true){
                console.log('2');
            document.getElementById('CFModFoodQal').value = row['rating1'];
            document.getElementById('CFModService').value = row['rating2'];
            document.getElementById('CFModValue').value = row['rating3'];
            ModRating()
            }

        }

    }

    Review.selectOne(options, callback);
}
function Top() {
    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            // both will work
            // var row = results.rows.item(i);
            var row = results.rows[i];

            htmlCode += `<li>
                        <a onclick="SetReview('${row['buisinessName']}');" href="#CFEditFeedbackPage"><h1>Buisness Name:${row['buisinessName']}</h1>
                        <p>Reviewer Email: ${row['reviewerEmail']}</p>
                        <p>Comments: ${row['reviewerComments']}</p></a>
                         </li>`;
            document.getElementById('CFFeedbackList').innerHTML = htmlCode;
        }
    }

    Review.select(options, callback);
}