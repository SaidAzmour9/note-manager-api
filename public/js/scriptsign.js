const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    let messages = [];

    // Clear previous errors
    email.style.borderColor = '';
    password.style.borderColor = '';
    errorElement.textContent = '';

    // Validate email
    if (email.value === '') {
        isValid = false;
        messages.push('Please enter your email');
        email.style.borderColor = '#F91F1F';
    }

    // Validate password
    if (password.value === '') {
        isValid = false;
        messages.push('Please enter your password');
        password.style.borderColor = '#F91F1F';
    }

    // If validation fails, show error messages and stop form submission
    if (!isValid) {
        errorElement.textContent = messages.join(', ');
        return; // Stop form submission
    }

    // If validation passes, submit the form
    form.submit();
});

function togglePassword(fieldId, button) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        button.innerHTML = '<img src="images/blind 1.png" alt="Show Password">';
    } else {
        passwordField.type = 'password';
        button.innerHTML = '<img src="images/blind 1.png" alt="Hide Password">';
    }
}
