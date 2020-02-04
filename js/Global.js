var selectedPay;
var comp;
function OpenMenu(){
  	  document.getElementById("mySidenav").style.width = "100%";
	  document.getElementById("mySidenavAbout").style.width = "100%";
	  document.getElementById("mySidenavDaily").style.width = "100%";
	  document.getElementById("mySidenavWeekly").style.width = "100%";
	  document.getElementById("mySidenavDisplay").style.width = "100%";
	  document.getElementById("mySidenavRemove").style.width = "100%";	  

}
function CloseMenu(){
	  document.getElementById("mySidenav").style.width = "0%";
	  document.getElementById("mySidenavAbout").style.width = "0%";
	  document.getElementById("mySidenavDaily").style.width = "0%";
	  document.getElementById("mySidenavWeekly").style.width = "0%";
	  document.getElementById("mySidenavDisplay").style.width = "0%";
	  document.getElementById("mySidenavRemove").style.width = "0%";	

}
function AddCompany(){
	var CompanyName = document.getElementById("CompanyNames").value;
	if(CompanyName.length >= 2 && CompanyName.length <= 40){

	var options = [CompanyName];

        function callback() {
            console.info("Success: Company Added");
            var form = document.getElementById('AddCompanyFRM');
			form.reset();
			RefreshDropDown();
			window.location="Index.html#CalculateDailyPay";
        }

			Company.insert(options,callback);
		}else{
	        alert("Name Must be between 2-40 charcters");
		
		}
}
function RefreshDropDown(){
	var options = [];

        function callback(tx, results) {
        var htmlCode = "";
        	htmlCode = `<option value="$$2233" diabled selected >Select an option.</option>`;
        	for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlCode += `<option value="${row['name']}">${row['name']}</option>`;
            }
            document.getElementById("CompanyNameDropDown").innerHTML = htmlCode;

        }

	Company.selectAll(options,callback);
}
function AddPay(){
	
	var reviewDate = document.getElementById("DateWorkeds").value;
	var hoursWorked = document.getElementById("Hours").value;
	var rateofpay = document.getElementById("PayRate").value;
	
	if(comp == "$$2233" || comp == null || comp == ""){
		alert("Please Select or Add Company");
		return;
	}

	if(hoursWorked < '0'){
		alert("Must have more than 0 hours");
		return;
	}

	if(hoursWorked <'3' && hoursWorked > '0'){
		hoursWorked = 3;
	}

	if(rateofpay < '0'){
		alert("Rate of pay must be equal more than 0$");
		return;
	}
	if(reviewDate == "yyyy-MM-dd" || reviewDate == ""){
		alert("0000ERROR");
		return;
	}

	var options = [comp,reviewDate,hoursWorked,rateofpay];

        function callback(tx, results) {
         var htmlCode = "";
         document.getElementById("Output").innerHTML = htmlCode;
         document.getElementById("Output").style.border = "2px solid grey";
         document.getElementById("Output").style.borderRadius = "30px";
         document.getElementById("Output").style.padding = "1em";

         	 htmlCode += `<h1 style="margin-bottom:2px;">Pay</h1>`;
         	 htmlCode += `<div style="width:100%; border: 2px solid black;"></div> `
            var grosePay = hoursWorked * rateofpay;
            htmlCode += `<p><b>Hours Worked:</b> ${hoursWorked} <br>
            				<b>Rate of Pay:</b>  $${rateofpay} <br>
            				<b>Total Gross Pay:</b>  $${grosePay}<br>
            				${rateofpay} X ${hoursWorked} = <br>
            				$${grosePay}`;

            document.getElementById("Output").innerHTML = htmlCode;
          // var resetbtn = document.getElementById('reset').style.display= "block";
        }

	Pays.insert(options,callback);
}
function resetgame(){
	     var htmlCode = "";
	     document.getElementById("Output").style.border = "none";
         document.getElementById("Output").innerHTML = htmlCode;
}
function DeleteSetup(indexvalue){


selectedPay = indexvalue;
window.location="Index.html#RemovePay";
deleteupdatepays(selectedPay);
}
function updatepays(){

	var options = [];

        function callback(tx, results) {
         var htmlCode = "";

        	for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var grosspay = row['HoursWorked'] * row['rateofpay'];
            htmlCode += `<div style="border:1px solid black; border-radius:30px; background-color:lightgrey; box-shadow: 3px 3px 3px 3px grey; margin-top:1em;" >`;
            htmlCode += `<input id="InfoDiv" hidden readonly="readonly" type="text" value="${row['id']}">`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;"><b>Company Name:</b></li>`;
            htmlCode += `<li>${row['companyName']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;"><b>Review Date:</b></li>`;
            htmlCode += `<li>${row['reviewDate']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;"><b>Hours Worked:</b></li>`;
            htmlCode += `<li ${row['HoursWorked']}> ${row['HoursWorked']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;"><b>Rate Of Pay:</b></li>`;
            htmlCode += `<li>${row['rateofpay']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;"><b>Gross Pay:</b></li>`;
            htmlCode += `<li>$${grosspay}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li><a onclick="DeleteSetup(${row['id']});">Delete</a></li>`;
            htmlCode += `</ul>`;
            htmlCode += `</div>`;
            htmlCode += `<div style="width:100%; margin-top:3em; border:1px solid lightgrey;" ></div>`
            htmlCode += `<br><br>`;
            }
            document.getElementById("test").innerHTML = htmlCode;
        }
	Pays.select(options,callback);
}

function deleteupdatepays(myvalue){
	var options = [myvalue];
        function callback(tx, results) {
         var htmlCode = "";

           for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];  

            }
            htmlCode += `<h1>Delete following Record?</h1>`
            htmlCode += `<div style="margin-left:4em; border:1px solid black;" >`;
            htmlCode += `<input id="InfoDiv" hidden readonly="readonly" type="text" value="${row['companyName']}">`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;">Company Name:</li>`;
            htmlCode += `<li>${row['companyName']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;">Review Date:</li>`;
            htmlCode += `<li>${row['reviewDate']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;">Hours Worked:</li>`;
            htmlCode += `<li ${row['HoursWorked']}> ${row['HoursWorked']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `<ul style="list-style-type: none;">`;
            htmlCode += `<li style="text-decoration: underline;">Rate Of Pay:</li>`;
            htmlCode += `<li>${row['rateofpay']}</li>`;
            htmlCode += `</ul>`;
            htmlCode += `</div>`; 
            document.getElementById("message").innerHTML = htmlCode;         
        }
	Pays.selectOne(options,callback);
}

function CancelDelete(){
window.location="Index.html#DisplayPays";
updatepays();
document.getElementById("message").innerHTML = "";
selectedPay = ""
}
function AcceptDelete(){
	var index = selectedPay;
	var options = [index];

        function callback(tx, results) {
         alert("Success: Record Deleted!");
         window.location="Index.html#DisplayPays";
         updatepays();
		 document.getElementById("message").innerHTML = "";
		 selectedPay = ""
        }
	Pays.deleteOne(options,callback);
}
function DBInitalize(){
 try{
		DB.createDatabase();
		if(A3DB){
   			DB.createTables();
		}
	} catch(e){
		console.log("ERROR HAS OCCURED UNABLE TO LOAD DATABASE");
	}
}

function init(){

	$("#Calculate").on("click", AddPay);
	$("#aMenu").on("click",OpenMenu);
	$(".closebtn").on("click",CloseMenu);
	$("#CompanyNameSubmit").on("click",AddCompany);
	$("#CompanyNameDropDown").on("click", RefreshDropDown);
	$("#CompanyNameDropDown").change(function(){
		comp = $("#CompanyNameDropDown").val();
	})
	$("#reset").on("click", resetgame);
	$("#displaypay").on("click",updatepays);
	$("#CancelDelete").on("click",CancelDelete);
	$("#AcceptDelete").on("click",AcceptDelete);
}

function LoadInfo(){
	updatepays();
	resetgame();
	RefreshDropDown();

}



$(document).ready(function(){
 init();
 DBInitalize();
 LoadInfo();

 });