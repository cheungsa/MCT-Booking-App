//may get usertype from the url...not sure how it will be passed here yet!
var userType = "patient";
var imgChanged = false;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// function to call onload and check profile type for page style
window.onload = setUp;
function setUp(){
	//*add defaults for error, direct to sign in*
	//set the html elements depending on the userType as well!
	
	//dynamically append list items for the appts scheduled
}

function editProfile(){
	document.getElementById(userType).style.display = "none";
	document.getElementById("editProfile").style.display = "block";
	
	//set the form values to the user name, email, password from ~the firebase??~
	
	//set event listeners for close and save changes in form
	document.getElementById("x").addEventListener("click", function(e) {
		close()
	});
	document.getElementById("save").addEventListener("click", function(e) {
		saveChanges()
	});
	
}

function close(){
	document.getElementById(userType).style.display = "block";
	document.getElementById("editProfile").style.display = "none";
}

function saveChanges(){
	//ERROR CHECKING
	
	//updates to the database
		//change password, change username, change email 
	
	//"Changes Saved!" popup...email confirmation to log back in ?
	//do we need username and password?
	if(imgChanged){
		//save new image url to firebase
		//reset imgChanged variable to false in case they go back to change again ?
		imgChanged = false;
	}
}

//read imgURL
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
            	document.getElementById("profPic").src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
            imgChanged = true;
        }
    }
