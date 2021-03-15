function confirm() {
	sendEmail();
	
	window.location.href = "confirmation.html";
}

function sendEmail() {
	Email.send({
    SecureToken : "<your generated token>",
    To : "project@mountaincounseling.org",
    From : "project@mountaincounseling.org",
	Bcc : "project@mountaincounseling.org",
    Subject : "Test Email",
    Body : "<html><h2>Test</h2><strong>Booked appointment successfully!</strong><br></br></html>"
    }).then(
        message => alert("mail sent successfully")
    );
}