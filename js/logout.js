const baseUrl = 'http://localhost:5000/api/v1/auth';
const logouturl = `${baseUrl}/logout`;

logoutRequest = document.getElementById('logout').addEventListener('click', async(event) => {
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
