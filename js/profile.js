var userType = "patient";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// function to call onload and check profile type for page style
window.onload = setUp;
function setUp(){
	//*add defaults for error, direct to sign in*
	
	userType = urlParams.get("user");
	
	//default to patient portal 
	var title = "Patient Booking Portal";

	//access firebase OR URL params (rn) to set the userType
	if(userType=="clinician"){
		 title = "Clinician Booking Portal";
		 document.getElementById("clinician").style.display = "block";
		 document.getElementById("patient").style.display = "none";
	}
	//set the html secitons to show patient info: 
		//appointments(upcoming, previous), patient selection (+add), book new appt
	else{
	
	}
	document.getElementById("profileTitle").innerHTML = title;
	
	//set the html elements depending on the userType as well!
}

function editProfile(){
	document.getElementById("patient").style.display = "none";
	document.getElementById("clinician").style.display = "none";
	document.getElementById("editProfile").style.display = "block";
}


