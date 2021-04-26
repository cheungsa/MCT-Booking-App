var bucketName = "mctbooking-web";
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
  params: { Bucket: bucketName, Key: '', Body: ''}
});

/*** Patient Intake Form ***/
var clientAllergyCount = 0;
var childCount = 1;
var childrenAllergyCount = [0];
const childForm = document.getElementById('child-container1');

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
		
		document.getElementById('client-allergy1').setAttribute("required", "required");
		document.getElementById('client-allergy1-reaction').setAttribute("required", "required");
		document.getElementById('client-allergy1-startDate').setAttribute("required", "required");

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
		
		clone.getElementsByTagName('label')[0].setAttribute('for', 'client-allergy' + clientAllergyCount);
		clone.getElementsByTagName('label')[1].setAttribute('for', 'client-allergy' + clientAllergyCount + '-reaction');
		clone.getElementsByTagName('label')[2].setAttribute('for', 'client-allergy' + clientAllergyCount + '-startDate');
		clone.getElementsByTagName('input')[0].id = 'client-allergy' + clientAllergyCount;		
		clone.getElementsByTagName('input')[1].id = 'client-allergy' + clientAllergyCount + '-reaction';
		clone.getElementsByTagName('input')[2].id = 'client-allergy' + clientAllergyCount + '-startDate';
		clone.getElementsByTagName('input')[0].setAttribute("required", "required");
		clone.getElementsByTagName('input')[1].setAttribute("required", "required");
		clone.getElementsByTagName('input')[2].setAttribute("required", "required");
		clone.getElementsByTagName('input')[0].value = '';		
		clone.getElementsByTagName('input')[1].value = '';
		clone.getElementsByTagName('input')[2].value = '';
	
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
		document.getElementById('client-allergy1').value = '';
		document.getElementById('client-allergy1-reaction').value = '';
		document.getElementById('client-allergy1-startDate').value = '';
		document.getElementById('client-allergy1').removeAttribute('required');
		document.getElementById('client-allergy1-reaction').removeAttribute('required');
		document.getElementById('client-allergy1-startDate').removeAttribute('required');
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
			
			allergies[i].getElementsByTagName('label')[0].setAttribute('for', 'client-allergy' + allergyNum);
			allergies[i].getElementsByTagName('label')[1].setAttribute('for', 'client-allergy' + allergyNum + '-reaction');
			allergies[i].getElementsByTagName('label')[2].setAttribute('for', 'client-allergy' + allergyNum + '-startDate');
			allergies[i].getElementsByTagName('input')[0].id = 'client-allergy' + allergyNum;
			allergies[i].getElementsByTagName('input')[1].id = 'client-allergy' + allergyNum + '-reaction';
			allergies[i].getElementsByTagName('input')[2].id = 'client-allergy' + allergyNum + '-startDate';
		}

		allergy.remove();
	}
}

function addChild() {
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
		buttons[0].style.display = 'block';
		buttons[1].id = "btn-add-child" + childCount + "-allergy";
		buttons[2].id = "btn-remove-child" + childCount + "-allergy1";
		
		// Rename allergies container
		var numAllergies = clone.getElementsByClassName('child-allergies-container').length;
		var allergies = clone.getElementsByClassName('child-allergies-container')[numAllergies-1];
		allergies.getElementsByTagName('label')[0].setAttribute('for', 'child' + childCount + '-allergy1');
		allergies.getElementsByTagName('label')[1].setAttribute('for', 'child' + childCount + '-allergy1-reaction');
		allergies.getElementsByTagName('label')[2].setAttribute('for', 'child' + childCount + '-allergy1-startDate');
		allergies.getElementsByTagName('input')[0].id = "child" + childCount + "-allergy1";
		allergies.getElementsByTagName('input')[1].id = "child" + childCount + "-allergy1-reaction";
		allergies.getElementsByTagName('input')[2].id = "child" + childCount + "-allergy1-startDate";
		
		// Clear elements
		for (var i=0; i<clone.getElementsByTagName('input').length; i++) {
			clone.getElementsByTagName('input')[i].value = '';
		}
		for (var i=0; i<clone.getElementsByTagName('select').length; i++) {
			clone.getElementsByTagName('select')[i].value = '';
		}
		var clone_allergies = clone.getElementsByClassName('child-allergy-container');
		for (var i=clone_allergies.length-1; i>0; i--) {
			clone_allergies[i].remove();
		}
		clone.getElementsByClassName('child-allergy-container')[0].style.display = 'none';
		
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
			buttons[0].id = "btn-remove-child" + childNum;
			buttons[1].id = "btn-add-child" + childNum + "-allergy";
			
			// Update allergies of children
			var allergies = children[i].getElementsByClassName('child-allergy-container');
			for (var j=0; j<allergies.length; j++) {				
				allergies[j].id = "child" + childNum + "-allergy" + (j+1) + "-container";
				allergies[j].getElementsByTagName('button')[0].id = "btn-remove-child" + childNum + "-allergy" + (j+1);
				allergies[j].getElementsByTagName('label')[0].setAttribute('for', "child" + childNum + (j+1));
				allergies[j].getElementsByTagName('label')[1].setAttribute('for', "child" + childNum + (j+1) + '-reaction');
				allergies[j].getElementsByTagName('label')[2].setAttribute('for', "child" + childNum + (j+1) + '-startDate');
				allergies[j].getElementsByTagName('input')[0].id = "child" + childNum + "-allergy" + (j+1);
				allergies[j].getElementsByTagName('input')[1].id = "child" + childNum + "-allergy" + (j+1) + "-reaction";
				allergies[j].getElementsByTagName('input')[2].id = "child" + childNum + "-allergy" + (j+1) + "-startDate";	
			}
		}
		
		var child1RmBtn = document.getElementById('btn-remove-child1');
		child1RmBtn.style.display = 'none';
		child.remove();
	}
}

function addChildAllergy(btnId) {
	var id = String(btnId).split("child")[1].split("-allergy")[0]; // ex: "btn-add-child1-allergy"
	var allergyForm = document.getElementById('child' + id + '-allergy1-container');

	if (childrenAllergyCount[id-1] == 0) {
		allergyForm.style.display = 'block';
		
		document.getElementById('child' + id + '-allergy1').setAttribute("required", "required");
		document.getElementById('child' + id + '-allergy1-reaction').setAttribute("required", "required");
		document.getElementById('child' + id + '-allergy1-startDate').setAttribute("required", "required");

		childrenAllergyCount[id-1]++;
	}
	else {
		var parent = document.getElementById('child' + id + '-allergy' + childrenAllergyCount[id-1] + '-container');
		var clone = parent.cloneNode(true);
		childrenAllergyCount[id-1]++;
		clone.setAttribute('id', 'child' + id + '-allergy' + childrenAllergyCount[id-1] + '-container'); // ex: 'child1-allergy1-container'
		clone.getElementsByTagName('h5')[0].innerHTML = "Allergy " + childrenAllergyCount[id-1];
		clone.getElementsByTagName('button')[0].id = "btn-remove-child" + id + "-allergy" + childrenAllergyCount[id-1]; // ex: 'btn-remove-child1-allergy1'
		
		clone.getElementsByTagName('label')[0].setAttribute('for', 'child' + id + '-allergy' + childrenAllergyCount[id-1]);
		clone.getElementsByTagName('label')[1].setAttribute('for', 'child' + id + '-allergy' + childrenAllergyCount[id-1] + '-reaction');
		clone.getElementsByTagName('label')[2].setAttribute('for', 'child' + id + '-allergy' + childrenAllergyCount[id-1] + '-startDate');
		clone.getElementsByTagName('input')[0].id = 'child' + id + '-allergy' + childrenAllergyCount[id-1];		
		clone.getElementsByTagName('input')[1].id = 'child' + id + '-allergy' + childrenAllergyCount[id-1] + '-reaction';
		clone.getElementsByTagName('input')[2].id = 'child' + id + '-allergy' + childrenAllergyCount[id-1] + '-startDate';
		clone.getElementsByTagName('input')[0].value = '';		
		clone.getElementsByTagName('input')[1].value = '';
		clone.getElementsByTagName('input')[2].value = '';
		
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
		document.getElementById('child' + childId + '-allergy1').value = '';
		document.getElementById('child' + childId + '-allergy1-reaction').value = '';
		document.getElementById('child' + childId + '-allergy1-startDate').value = '';
		document.getElementById('child' + childId + '-allergy1').removeAttribute('required');
		document.getElementById('child' + childId + '-allergy1-reaction').removeAttribute('required');
		document.getElementById('child' + childId + '-allergy1-startDate').removeAttribute('required');
	}
	else {
		// Update IDs of allergies after the removed allergy
		for (var i=allergyId; i<allergies.length; i++) {
			var allergyNum = parseInt(allergies[i].id.split("allergy")[1].split("-container")[0]);
			allergyNum--;
			allergies[i].getElementsByTagName('h5')[0].innerHTML = "Allergy " + allergyNum;
			allergies[i].getElementsByTagName('button')[0].id = "btn-remove-child" + childId + "-allergy" + allergyNum; // ex: 'btn-remove-child1-allergy1'
			allergies[i].id = "child" + childId + "-allergy" + allergyNum + "-container";
			
			allergies[i].getElementsByTagName('label')[0].setAttribute('for', 'child' + childId + '-allergy' + allergyNum);
			allergies[i].getElementsByTagName('label')[1].setAttribute('for', 'child' + childId + '-allergy' + allergyNum + '-reaction');
			allergies[i].getElementsByTagName('label')[2].setAttribute('for', 'child' + childId + '-allergy' + allergyNum + '-startDate');
			allergies[i].getElementsByTagName('input')[0].id = 'child' + childId + '-allergy' + allergyNum;		
			allergies[i].getElementsByTagName('input')[1].id = 'child' + childId + '-allergy' + allergyNum + '-reaction';
			allergies[i].getElementsByTagName('input')[2].id = 'child' + childId + '-allergy' + allergyNum + '-startDate';
		}

		allergy.remove();
	}
}

/*
 * Upload data to S3 bucket.
 */
function upload(key, obj) {
	const uploadParams = {
	  	Bucket: bucketName,
	  	Key: key,    
		Body: obj,
		ContentType: 'text/plain'
	}
	
	s3.upload(uploadParams, (err, data) => {
		if (err) {
	    	console.log('upload failed');
	      	return 0;
	    }
	
	   	console.log('upload', data);
		return 1;
	 })
}

/*
 * Fetch data in S3 bucket and update it.
 */
function update(key, email, doAdd) {
	const fetchParams = {
		Bucket: bucketName,
		Key: key
	}
	
	s3.getObject(fetchParams, (err, data) => {
		if (err) {
	    	console.log('fetching data failed');
	      	return 0;
	    }
	
		var content = data.Body.toString(); // ex: content is "1@g.com, 2@g.com, 3@g.com,"
		
		// Add email to subscription list; else, remove email from subscription list
		if (doAdd) {
			if (content.includes(email)) {
				return 0;
			}
			
			content += email + ', ';
		}
		else {
			var firstComma = content.indexOf(',');				
			if (content.substring(0, firstComma).equals(email)) {
				content = content.substring(firstComma + 2, content.length);
				return upload(key, content);
			}
			
			var idx = content.search(', ' + email + ',');
			if (idx < 0) {
				return 0;
			}
			
			content = content.substring(0, idx) + content.substring(idx + email.length + 2, content.length);
		}		
				
		return upload(key, content);
	 })
}


function printValues(obj) {
	var str = '';
    for (var key in obj) {
		str += key + ': ' + obj[key] + '\n'; 
    }
	console.log(str);
	alert(str);
}

function checkValidClientForm() {
	var isValid = true;
	
	var form = document.getElementById('client-form');
	var inputs = form.getElementsByClassName('form-control');
	
	var mssg = "Please fill out the required field: ";
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].hasAttribute('required') && inputs[i].value.length == 0) {
			isValid = false;
			
			if (inputs[i].labels.length == 0) {
				if (inputs[i].id.includes('Mailing')) {
					mssg += 'Mailing Address';
				}
				else if (inputs[i].id.includes('Physical')) {
					mssg += 'Physical Address';
				}
				else {
					mssg = "Please fill out all required fields (*)";
				}
			}
			else {
				mssg += inputs[i].labels[0].textContent.split(" *")[0];	
			}   
			
			break;
		}
		else if (inputs[i].value == 'Other' && inputs[i+1].value.length == 0) {
			isValid = false;
			mssg += inputs[i].labels[0].innerHTML;
			break;
		}
	}
	
	document.getElementById('client-error-message').innerText = mssg.split("<")[0];

	return isValid;
}

function submitClientForm() {	
	if (!checkValidClientForm()) {
		document.getElementById('client-error-message').style.display = 'block';
		return 0;
	}
	
	document.getElementById('client-error-message').innerText = "There was an error processing your form.";
	document.getElementById('client-error-message').style.display = 'none';
	
	try {
		// Parse client data
		var email = document.getElementById('clientEmail').value;
		var firstName = document.getElementById('clientFirstName').value;
		var lastName = document.getElementById('clientLastName').value;
		var phone = document.getElementById('clientPhone').value;
		var dob = document.getElementById('clientDateOfBirth').value;
		
		var gender = document.getElementById('clientGender').value;
		if (gender == "Other") {
			gender = document.getElementById('clientGenderOther').value;
		}
		
		var language = document.getElementById('clientPreferredLanguage').value;
		if (language == "Other") {
			language = document.getElementById('clientPreferredLanguageOther').value;
		}
		
		var ethnicity = document.getElementById('clientEthnicity').value;
		
		var physicalAddress = document.getElementById('clientPhysicalAddress').value;
		var physicalAddress2 = document.getElementById('clientPhysicalAddress2').value;
		var physicalAddressState = document.getElementById('clientPhysicalAddressState').value;
		var physicalAddressZipCode = document.getElementById('clientPhysicalAddressZipCode').value;
		
		var mailingAddress = document.getElementById('clientMailingAddress').value;
		var mailingAddress2 = document.getElementById('clientMailingAddress2').value;
		var mailingAddressState = document.getElementById('clientMailingAddressState').value;
		var mailingAddressZipCode = document.getElementById('clientMailingAddressZipCode').value;
		
		var insuranceType = document.getElementById('clientInsuranceType').value;
		var insuranceNum = document.getElementById('clientInsuranceNumber').value;
		var birthCounty = document.getElementById('clientBirthCounty').value;
		var birthState = document.getElementById('clientBirthState').value;
		var school = document.getElementById('clientSchoolAttending').value;
		var grade = document.getElementById('clientGradeLevel').value;
		
		var employmentStatus = document.getElementById('clientEmploymentStatus').value;
		if (employmentStatus == "Other") {
			employmentStatus = document.getElementById('clientEmploymentStatusOther').value;
		}
		
		var maritalStatus = document.getElementById('clientMaritalStatus').value;
		
		var livingArrangement = document.getElementById('clientLivingArrangement').value;
		if (livingArrangement == "Other") {
			livingArrangement = document.getElementById('clientLivingArrangementOther').value;
		}
		
		var dependentsOver18 = document.getElementById('clientDependentsOver18').value;
		var dependentsUnder18 = document.getElementById('clientDependentsUnder18').value;
		
		// Write client data to a txt file
		let obj =  {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			dateOfBirth: dob,
			gender: gender,
			preferredLanguage: language,
			ethnicity: ethnicity,
			physicalAddress: {
					address1: physicalAddress,
					address2: physicalAddress2,
					state: physicalAddressState,
					zipCode: physicalAddressZipCode
				},			
			mailingAddress: {
					address1: mailingAddress,
					address2: mailingAddress2,
					state: mailingAddressState,
					zipCode: mailingAddressZipCode
			},
			insuranceType: insuranceType,
			insuranceNumber: insuranceNum,
			birthCounty: birthCounty,
			birthState: birthState,
			schoolAttending: school,
			gradeLevel: grade,
			employmentStatus: employmentStatus,
			maritalStatus: maritalStatus,
			livingArrangement: livingArrangement,
			dependentsOver18: dependentsOver18,
			dependentsUnder18: dependentsUnder18,
			allergies: {}
		};
		
		var allergiesContainer = document.getElementById('client-allergies-container');
		var allergies = allergiesContainer.getElementsByTagName('input');
		var num = 1;
		
		if (clientAllergyCount > 0) {
			for (var i=0; i<allergies.length; i+=3) {
				if (i+2 < allergies.length) {
					var path = 'allergy' + num;
					obj.allergies[path] = {};
					obj.allergies[path].allergy = allergies[i].value;
					obj.allergies[path].reaction = allergies[i+1].value;
					obj.allergies[path].startDate = allergies[i+2].value;
					num++;
				}
			}	
		}
		
		// Upload parsed client data to AWS S3 database
		upload('clients/' + email + '/' + firstName + '_' + lastName + '.txt', JSON.stringify(obj))

		// Webpage redirects after 3 seconds
		alert("Thank you for submitting your form! You will be redirected back to the home page in a moment.");
		setTimeout(function() {
            window.location.href = 'https://www.mountaincounseling.org/';
    	}, 3000);
	} catch (err) {
		console.log(err);
	}
	
	return false; // false to avoid reload on the same page
}

function checkValidGuardianForm() {
	var isValid = true;
	
	var form = document.getElementById('parent-form');
	var inputs = form.getElementsByClassName('form-control');
	
	var mssg = "Please fill out the required field: ";
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].hasAttribute('required') && inputs[i].value.length == 0) {
			isValid = false;
			
			if (inputs[i].labels.length == 0) {
				if (inputs[i].id.includes('Mailing')) {
					mssg += 'Mailing Address';
				}
				else if (inputs[i].id.includes('Physical')) {
					mssg += 'Physical Address';
				}
				else {
					mssg = "Please fill out all required fields (*)";
				}
			}
			else {
				mssg += inputs[i].labels[0].textContent.split(" *")[0];	
			}
			   
			break;
		}
		else if (inputs[i].value == 'Other' && inputs[i+1].value.length == 0) {
			isValid = false;
			mssg += inputs[i].labels[0].textContent.split(" *")[0];
			break;
		}
	}
	
	document.getElementById('parent-error-message').innerText = mssg.split("<")[0];

	return isValid;
}

function submitGuardianForm() {
	if (!checkValidGuardianForm()) {
		document.getElementById('parent-error-message').style.display = 'block';
		return 0;
	}
	
	document.getElementById('parent-error-message').innerText = "There was an error processing your form.";
	document.getElementById('parent-error-message').style.display = 'none';
	
	try {
		// Parse guardian data
		var email = document.getElementById('guardianEmail').value;
		var firstName = document.getElementById('guardianFirstName').value;
		var lastName = document.getElementById('guardianLastName').value;
		var phone = document.getElementById('guardianPhone').value;
		
		var relationship = document.getElementById('guardianRelationship').value;
		if (relationship == "Other") {
			relationship = document.getElementById('guardianRelationshipOther').value;
		}
		
		var legalGuardian = document.getElementById('guardianLegalGuardian').value;
		
		var mailingList = 'no';
		if (document.getElementById('yesMailingRadio').checked) {
			mailingList = 'yes';
		}
		
		var childrenUnder6 = 'no';
		if (document.getElementById('yesChildrenUnder6Radio').checked) {
			childrenUnder6 = 'yes';
		}
		
		var training = 'no';
		if (document.getElementById('yesTrainingRadio').checked) {
			training = 'yes';
		}
		
		// Handle mailing subscriptions and training signups
		if (mailingList == 'yes') {
			update('email-subscriptions/email-subscriptions.txt', email, true);
		} 
		else {
			update('email-subscriptions/email-subscriptions.txt', email, false);
		}
		if (training == 'yes') {
			update('training-signups/training-signups.txt', email, true);
		} 
		else {
			update('training-signups/training-signups.txt', email, false);
		}
						
		// Write guardian data to object
		let obj =  {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			relationship: relationship,
			legalGuardian: legalGuardian,
			mailingList: mailingList,
			childrenUnder6: childrenUnder6,
			training: training,
			children: {}
		};
		
		// Write children data to object
		var children = document.getElementsByClassName('child-container');
		for (var i=0; i<children.length; i++) {
			var num = i + 1;
			var inputs = children[i].getElementsByClassName('form-control');
			var allergies = document.getElementById('child' + num + '-allergies-container');
			var allergyInputs = allergies.getElementsByTagName('input');
			var childPath = 'child' + num;
			
			var output = '';
			for (var k=0; k<inputs.length; k++) {
				output += k + ': ' + inputs[k].value + '   |   ';
			}
			
			obj.children[childPath] = {};
			obj.children[childPath].firstName = inputs[0].value;
			obj.children[childPath].lastName = inputs[1].value;
			obj.children[childPath].dateOfBirth = inputs[2].value;
			
			obj.children[childPath].gender = inputs[3].value;
			if (inputs[3] == 'Other') {
				obj.children[childPath].gender = inputs[4].value;
			}
			
			obj.children[childPath].preferredLanguage = inputs[5].value;
			if (inputs[5] == 'Other') {
				obj.children[childPath].preferredLanguage = inputs[6].value;
			}
			
			obj.children[childPath].ethnicity = inputs[7].value;
			
			obj.children[childPath].physicalAddress = {};
			obj.children[childPath].physicalAddress.address1 = inputs[8].value;
			obj.children[childPath].physicalAddress.address2 = inputs[9].value;
			obj.children[childPath].physicalAddress.state = inputs[10].value;
			obj.children[childPath].physicalAddress.zipCode = inputs[11].value;
			
			obj.children[childPath].mailingAddress = {};
			obj.children[childPath].mailingAddress.address1 = inputs[12].value;
			obj.children[childPath].mailingAddress.address2 = inputs[13].value;
			obj.children[childPath].mailingAddress.state = inputs[14].value;
			obj.children[childPath].mailingAddress.zipCode = inputs[15].value;
			
			obj.children[childPath].insuranceType = inputs[16].value;
			obj.children[childPath].insuranceNumber = inputs[17].value;
			obj.children[childPath].birthCounty = inputs[18].value;
			obj.children[childPath].birthState = inputs[19].value;
			obj.children[childPath].schoolAttending = inputs[20].value;
			obj.children[childPath].gradeLevel = inputs[21].value;
			
			obj.children[childPath].employmentStatus = inputs[22].value;
			if (inputs[22] == 'Other') {
				obj.children[childPath].employmentStatus = inputs[23].value;
			}
			
			obj.children[childPath].maritalStatus = inputs[24].value;
			
			obj.children[childPath].livingArrangement = inputs[25].value;
			if (inputs[25] == 'Other') {
				obj.children[childPath].livingArrangement = inputs[26].value;
			}
			
			obj.children[childPath].dependentsOver18 = inputs[27].value;
			obj.children[childPath].dependentsUnder18 = inputs[28].value;
			
			obj.children[childPath].allergies = {};
			
			var count = 1;
			for (var j=0; j<allergyInputs.length; j+=3) {
				if (j+2 < allergyInputs.length) {
					var allergyPath = 'allergy' + count;
					obj.children[childPath].allergies['allergy' + count] = {};
					obj.children[childPath].allergies[allergyPath].allergy = allergyInputs[j].value;
					obj.children[childPath].allergies[allergyPath].reaction = allergyInputs[j+1].value;
					obj.children[childPath].allergies[allergyPath].startDate = allergyInputs[j+2].value;
					count++;
				}
			}
		}
		
		// Upload parsed client data to AWS S3 database
		upload('clients/' + email + '/' + firstName + '_' + lastName + '.txt', JSON.stringify(obj));
		
		// Webpage redirects after 3 seconds
		alert("Thank you for submitting your form! You will be redirected back to the home page in a moment.");
		setTimeout(function() {
            window.location.href = 'https://www.mountaincounseling.org/';
    	}, 3000);
	} catch (err) {
		console.log(err);
	}
	
	return false;
}
