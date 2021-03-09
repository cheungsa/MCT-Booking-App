// This page simply changes the text based on the user type

console.log(user_type)

if (user_type == CLINICIAN) {
    document.getElementById('sign_in_text').textContent = "Clinician Sign In"
}
else {
    document.getElementById('sign_in_text').textContent = "Patient Sign In"
}