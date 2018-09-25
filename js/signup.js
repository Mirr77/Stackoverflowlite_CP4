const apiUrl = 'http://localhost:5000/api/v1/auth';
const signupurl = `${apiUrl}/signup`;

const signupRequest = document.getElementById('signup').addEventListener('click', async(event) => {
      event.preventDefault();
      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('pass').value;

      fetch(signupurl, {
        method: 'POST',
        headers: {"Content-type":"application/json" ,
                  "Accept":"application/json"},
        body: JSON.stringify({
          "username":username,
          "email":email,
          "password":password
        })
      })
        .then(response => response.json())
        .then(data => {
          if(data.message == "Username is taken"){
            document.getElementById('error').innerHTML= data.message;
          }
          else if(data.message == "Email not provided"){
            document.getElementById('error').innerHTML = data.message;
          }
          else if(data.message == "Username not provided"){
            document.getElementById('error').innerHTML = data.message;
          }
          else if(data.message == "incorrect email format"){
            document.getElementById('error').innerHTML=data.message;
          }
          else if(data.message == "Password not provided"){
            document.getElementById('error').innerHTML=data.message;
          }
          else if(data.message == "Invalid token. Please log in or sign up to continue"){
            document.getElementById('error').innerHTML=data.message;
          }
          else if(data.message  == "User registered successfully"){
            window.localStorage.setItem('token', data['token'])
            window.localStorage.setItem('user_id',data['user']['user_id'])
            window.location.href = 'questions.html';
          }
      })
        .catch(err => {
          console.log(`Fetch Error: ${err}`);
        });
    });
