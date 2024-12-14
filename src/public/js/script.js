const form = document.getElementById('form');
const username = document.getElementById('username')
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(email.value === '') {
        email.style.borderColor = '#F91F1F'
        }
        if(password.value === '') {
            password.style.borderColor = '#F91F1F';
            }
            if(password2.value === '') {
                password2.style.borderColor = '#F91F1F';
                }
                if(password.value !== password2.value) {
                    password2.style.borderColor = '#F91F1F';
                    }
                    if(username.value === '') {
                        username.style.borderColor = '#F91F1F';
                    }
    errorElement.innerHTML = 'All fields required';
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


