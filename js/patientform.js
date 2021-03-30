/*** AWS database ***/
/*// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-1:cb26517b-b52a-4de3-a9fd-d2779d356131',
});*/
var albumBucketName = "mctbooking-web";
var bucketRegion = "us-west-1";
var IdentityPoolId = "us-west-1:cb26517b-b52a-4de3-a9fd-d2779d356131";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});

/*** Patient Intake Form ***/
var clientAllergyCount = 0;
var childCount = 0;
var childrenAllergyCount = [0];

function parentChildCheck() {
	if (document.getElementById('parentRadio').checked) {
		// show parent form
        document.getElementById('client-form-divider').style.display = 'block';
        document.getElementById('parent-container').style.display = 'block';
        document.getElementById('client-container').style.display = 'none';
    }
	else if (document.getElementById('childRadio').checked) {
        // show client form
        document.getElementById('client-form-divider').style.display = 'block';
        document.getElementById('client-container').style.display = 'block';
        document.getElementById('parent-container').style.display = 'none';
    }
	else {
        // hide both parent and client forms
        document.getElementById('parent-container').style.display = 'none';
        document.getElementById('client-container').style.display = 'none';
    }
}

function addClientAllergy() {
	var allergyForm = document.getElementById('client-allergy-container1');

	if (clientAllergyCount == 0) {
		allergyForm.style.display = 'block';
		clientAllergyCount++;
	}
	else {
		var parent = document.getElementById('client-allergy-container' + clientAllergyCount);
		var clone = parent.cloneNode(true);
		clientAllergyCount++;
		clone.setAttribute('id', 'client-allergy-container' + clientAllergyCount);
		clone.style.display = 'block';
		clone.getElementsByTagName('h5')[0].innerHTML = "Allergy " + clientAllergyCount;
		clone.getElementsByTagName('button')[0].id = "btn-remove-child-allergy" + clientAllergyCount;
		parent.after(clone);
	}
}

function removeClientAllergy(btnId) {
	var id = String(btnId).split("allergy")[1];
	var allergy = document.getElementById('client-allergy-container' + id);
	var allergies = document.getElementsByClassName('client-allergy-container');

	clientAllergyCount--;

	if (clientAllergyCount == 0) {
		// If only one allergy left, hide it as a template for future allergies
		allergy.style.display = 'none';
	}
	else {
		// Update IDs of allergies after the removed allergy
		for (var i=id; i<allergies.length; i++) {
			var allergyNum = parseInt(allergies[i].id.split("container")[1]);
			allergyNum--;
			allergies[i].getElementsByTagName('h5')[0].innerHTML = "Allergy " + allergyNum;
			allergies[i].getElementsByTagName('button')[0].id = "btn-remove-client-allergy" + allergyNum;
			allergies[i].id = 'client-allergy-container' + allergyNum;
		}

		allergy.remove();
	}
}

function addChild() {
	var childForm = document.getElementById('child-container1');

	if (childCount == 0) {
		childForm.style.display = 'block';
		childCount++;
		if (childrenAllergyCount.length == 0) {
			childrenAllergyCount.push(0);
		}
	}
	else {
		var parent = document.getElementById('child-container' + childCount);
		var clone = parent.cloneNode(true);
		var buttons = clone.getElementsByTagName('button');
		childCount++;
		childrenAllergyCount.push(0);
		clone.setAttribute('id', 'child-container' + childCount);
		clone.getElementsByTagName('h3')[0].innerHTML = "Child " + childCount;
		clone.getElementsByClassName('child-allergies-container')[0].id = "child" + childCount + "-allergies-container";
		clone.getElementsByClassName('child-allergy-container')[0].id = 'child' + childCount + '-allergy1-container';
		buttons[0].id = "btn-remove-child" + childCount;
		buttons[1].id = "btn-add-child" + childCount + "-allergy";
		buttons[2].id = "btn-remove-child" + childCount + "-allergy1";
		parent.after(clone);
	}
}

function removeChildForm(btnId) {
	var id = String(btnId).split("child")[1];
	var child = document.getElementById('child-container' + id);
	var children = document.getElementsByClassName('child-container');

	childCount--;
	childrenAllergyCount.splice(id-1, 1);

	if (children.length == 1) {
		// If only one child, hide it as a template for future allergies
		child.style.display = 'none';
	}
	else {
		// Update IDs of children after the removed child
		for (var i=id; i<children.length; i++) {
			var childNum = parseInt(children[i].id.split("container")[1]);
			var buttons = children[i].getElementsByTagName('button');
			childNum--;
			children[i].getElementsByTagName('h3')[0].innerHTML = "Child " + childNum;
			children[i].id = "child-container" + childNum;
			children[i].getElementsByClassName('child-allergies-container')[0].id = "child" + childNum + "-allergies-container";
			children[i].getElementsByClassName('child-allergy-container')[0].id = "child" + childNum + "-allergy1-container";
			buttons[0].id = "btn-remove-child" + childNum;
			buttons[1].id = "btn-add-child" + childNum + "-allergy";
			buttons[2].id = "btn-remove-child" + childNum + "-allergy1";
		}

		child.remove();
	}
}

function addChildAllergy(btnId) {
	var id = String(btnId).split("child")[1].split("-allergy")[0]; // ex: "btn-add-child1-allergy"
	var allergyForm = document.getElementById('child' + id + '-allergy1-container');

	if (childrenAllergyCount[id-1] == 0) {
		allergyForm.style.display = 'block';
		childrenAllergyCount[id-1]++;
	}
	else {
		var parent = document.getElementById('child' + id + '-allergy' + childrenAllergyCount[id-1] + '-container');
		var clone = parent.cloneNode(true);
		childrenAllergyCount[id-1]++;
		clone.setAttribute('id', 'child' + id + '-allergy' + childrenAllergyCount[id-1] + '-container'); // ex: 'child1-allergy1-container'
		clone.getElementsByTagName('h5')[0].innerHTML = "Allergy " + childrenAllergyCount[id-1];
		clone.getElementsByTagName('button')[0].id = "btn-remove-child" + id + "-allergy" + childrenAllergyCount[id-1]; // ex: 'btn-remove-child1-allergy1'
		parent.after(clone);
	}
}

function removeChildAllergy(btnId) {
	var ids = btnId.split("child")[1].split('-allergy'); // ex: 'btn-remove-child1-allergy1'
	var childId = ids[0];
	var allergyId = ids[1];
	var allergy = document.getElementById('child' + childId + '-allergy' + allergyId + '-container');
	var allergies = document.getElementById('child' + childId + '-allergies-container').getElementsByClassName('child-allergy-container');

	childrenAllergyCount[childId-1]--;

	if (childrenAllergyCount[childId-1] == 0) {
		// If only one allergy left, hide it as a template for future allergies
		allergy.style.display = 'none';
	}
	else {
		// Update IDs of allergies after the removed allergy
		for (var i=allergyId; i<allergies.length; i++) {
			var allergyNum = parseInt(allergies[i].id.split("allergy")[1].split("-container")[0]);
			allergyNum--;
			allergies[i].getElementsByTagName('h5')[0].innerHTML = "Allergy " + allergyNum;
			allergies[i].getElementsByTagName('button')[0].id = "btn-remove-child" + childId + "-allergy" + allergyNum; // ex: 'btn-remove-child1-allergy1'
			allergies[i].id = "child" + childId + "-allergy" + allergyNum + "-container";
		}

		allergy.remove();
	}
}

function storeData(path, data) {
	// Store client data in AWS database
	s3.headObject({ Key: path, Body: data }, function(err, path) {
		if (!err) {
			console.log(data + " already exists.");
			return 1;
	    }
	    if (err.code !== "NotFound") {
			console.log("There was an error submitting your form: " + err.message)
	      	return 0;
	    }
	    s3.putObject({ Key: key }, function(err, path) {
			if (err) {
		        console.log("There was an error submitting your form: " + err.message)
		      	return 0;
			}
			return 1;
	    });
	});
}

function submitClientForm() {
	var clientDataMap = new Map();
	
	// Parse client data
	try {
		var clientForm = document.getElementById('client-form').value;
		var email = clientForm.getElementById('inputEmail').value;
		/*var firstName = clientForm.getElementById('inputFirstName').value;
		var lastName = clientForm.getElementById('inputLastName').value;
		var phone = clientForm.getElementById('inputPhone').value;
		var dob = clientForm.getElementById('inputDateOfBirth').value;*/
		
		// Place client data in data structure
		let clientData = {
			firstName: clientForm.getElementById('inputFirstName').value,
			lastName: clientForm.getElementById('inputLastName').value,
			phone: clientForm.getElementById('inputPhone').value,
			dateOfBirth: clientForm.getElementById('inputDateOfBirth').value,
		};
		
		/*clientDataMap.set('firstName', clientForm.getElementById('inputFirstName').value);
		clientDataMap.set('lastName', clientForm.getElementById('inputLastName').value);
		clientDataMap.set('phone', clientForm.getElementById('inputPhone').value);
		clientDataMap.set('dateOfBirth', clientForm.getElementById('inputDateOfBirth').value);*/
		
		// Store email in AWS database first to identify unique account
		if (!storeClientData("clients/" + email, email)) {
			document.getElementById('client-error-message').style.display = 'block';
			return;
		}
		
		// Store client data in AWS database
		for (let key in clientData) {
			if (!storeClientData("clients/" + email + "/" + key, clientData[key])) {
				document.getElementById('client-error-message').style.display = 'block';
				return;
			}	
		}
		/*for (var i=0; i<clientDataArray.length; i++) {
			if (!storeClientData("clients/" + email + "/" + clientDataArray[i], clientDataArray[i])) {
				document.getElementById('client-error-message').style.display = 'block';
				return;
			}	
		}*/
		
		// Webpage redirects after 3 seconds
		alert("Thank you for submitting your form! You will be redirected back to the home page in a moment.");
		setTimeout(function() {
            window.location.href = 'https://www.tutorialspoint.com/javascript/';
    	}, 3000);
	} catch (err) {
		console.log(err);
		
	}
	//window.location.href = "confirm_appointment.html";
}

function submitGuardianForm() {
	var guardianDataArray = [];
	
	try {
		var guardianForm = document.getElementById('parent-form').value;
		var firstName = guardianForm.getElementById('guardianFirstName').value;
		var lastName = guardianForm.getElementById('guardianLastName').value;
		var phone = guardianForm.getElementById('guardianPhone').value;
		var email = guardianForm.getElementById('guardianEmail').value;
		
		// Place guardian data in array
		guardianDataArray.push(firstName);
		guardianDataArray.push(lastName);
		guardianDataArray.push(phone);
		
		// Store email in AWS database first to identify unique account
		if (!storeClientData(email)) {
			document.getElementById('parent-error-message').style.display = 'block';
			return;
		}
		
		// Store client data in AWS database
		for (var i=0; i<guardianDataArray.length; i++) {
			if (!storeData(data)) {
				document.getElementById('parent-error-message').style.display = 'block';
				return;
			}	
		}
		
		// Webpage redirects after 3 seconds
		alert("Thank you for submitting your form! You will be redirected back to the home page in a moment.");
		setTimeout(function() {
	            window.location.href = 'https://www.tutorialspoint.com/javascript/';
	    }, 3000);
	} catch (err) {
		console.log(err);
	}
	//window.location.href = "confirm_appointment.html";
}
