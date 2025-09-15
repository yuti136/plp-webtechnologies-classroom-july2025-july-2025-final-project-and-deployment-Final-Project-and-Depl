function showAlert() {
  alert("Thanks for visiting our site!");
}

function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("All fields are required!");
    return false;
  }

  alert("Form submitted successfully!");
  return true;
}
