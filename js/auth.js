const baseUrl = 'http://localhost:5000/api/v1/auth';
const loginurl = `${baseUrl}/login`;
const logouturl = `${baseUrl}/logout`;

const auth = {
  loginRequest: document.getElementById('login').addEventListener('click', async(event) => {
              event.preventDefault();
              let email = document.getElementById('login-email').value;
              let password = document.getElementById('login-pass').value;
            
              fetch(loginurl, {
                method:'POST',
                headers:{"Content-type":"application/json" ,
                          "Accept":"application/json"},
                body:JSON.stringify({
                  "email":email,
                  "password":password
                })
                  })
              .then(response => response.json())
              .then(data => {
                if(data.message == "The email you entered does not match any of our records"){
                  document.getElementById('error').innerHTML= data.message;
                }
                else if(data.message == "Password not provided"){
                  document.getElementById('error').innerHTML = data.message;
                }
                else if(data.message == "incorrect email format"){
                  document.getElementById('error').innerHTML = data.message;
                }
                else if(data.message == "Wrong password"){
                  document.getElementById('error').innerHTML=data.message;
                }
                else if(data.message == "incorrect email format"){
                  document.getElementById('error').innerHTML=data.message;
                }
                else if(data.message == "incorrect email format"){
                  document.getElementById('error').innerHTML=data.message;
                }
                else if(data.message == "Invalid token. Please log in or sign up to continue"){
                  document.getElementById('error').innerHTML="Please log in or sign up to continue";
                }
                else{
                  window.localStorage.setItem('token', data['token'])
                  window.localStorage.setItem('user_id',data['user']['user_id'])
                  window.location = 'questions.html'; 
                }
                console.log(data.message);
            })
              .catch(err => {
                console.log(`Fetch Error: ${err}`);
              });
            }),

  logoutRequest:  document.getElementById('.active.logout').addEventListener('click', async(event) => {
                  event.preventDefault();
                  fetch(logouturl, {
                          method:'POST',
                          headers:{"Authorization":localStorage.getItem('token')}
                        })
                          .then((response) => response.json())
                          .then(data => {
                            // Show notification message then redirect to login page
                            console.log('REs-data:', data);
                            window.location.href = 'index.html';
                  
                          })
                          .catch(err => {
                            console.log(`Fetch Error: ${err}`);
                          });
                      })
  };






