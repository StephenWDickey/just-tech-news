async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('https://pacific-brushlands-06734.herokuapp.com/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.loginBtn').addEventListener('click', loginFormHandler);



async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();

    const email = document.querySelector('#email-signup').value.trim();

    const password = document.querySelector('#password-signup').value.trim();

    // if we have username, email and password values
    // then we create a POST request for users endpoint
    // we create a new USER
    if (username && email && password) {
        // we assign await function to a variable, so we do not have to chain .then methods to fetch
        const response = await fetch('https://pacific-brushlands-06734.herokuapp.com/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    }
}

document.querySelector('.submitBtn').addEventListener('click', signupFormHandler);