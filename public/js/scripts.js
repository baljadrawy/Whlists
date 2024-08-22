  document.getElementById('toggle-forms').addEventListener('click', () => {
         const loginForm = document.getElementById('login-form');
         const registerForm = document.getElementById('register-form');
         const toggleButton = document.getElementById('toggle-forms');

         if (loginForm.style.display === 'none') {
             loginForm.style.display = 'block';
             registerForm.style.display = 'none';
             toggleButton.textContent = "Don't have an account? Register";
         } else {
             loginForm.style.display = 'none';
             registerForm.style.display = 'block';
             toggleButton.textContent = "Already have an account? Login";
         }
     });

     document.getElementById('register-form').addEventListener('submit', async (e) => {
         e.preventDefault();

         const username = document.getElementById('reg-username').value;
         const email = document.getElementById('reg-email').value;
         const password = document.getElementById('reg-password').value;

         const response = await fetch('/api/register', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ username, email, password }),
         });

         const data = await response.json();
         if (response.ok) {
             alert('Registration successful');
             // يمكنك إضافة إعادة توجيه هنا إلى صفحة القائمة
         } else {
             alert('Registration failed: ' + data.error);
         }
     });

     document.getElementById('login-form').addEventListener('submit', async (e) => {
         e.preventDefault();

         const email = document.getElementById('login-email').value;
         const password = document.getElementById('login-password').value;

         const response = await fetch('/api/login', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ email, password }),
         });

         const data = await response.json();
         if (response.ok) {
             alert('Login successful');
             // يمكنك إضافة إعادة توجيه هنا إلى صفحة القائمة
         } else {
             alert('Login failed: ' + data.error);
         }
     });
     


  document.getElementById('login-form').addEventListener('submit', async (e) => {
         e.preventDefault();

         const email = document.getElementById('login-email').value;
         const password = document.getElementById('login-password').value;

         const response = await fetch('/api/login', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ email, password }),
         });

         const data = await response.json();
         if (response.ok) {
             localStorage.setItem('token', data.token); // Store the token in localStorage
             window.location.href = 'wishlists.html'; // Redirect to wishlists page
         } else {
             alert('Login failed: ' + data.error);
         }
     });
     
