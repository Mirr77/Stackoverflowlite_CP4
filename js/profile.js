const profileUrl='http://localhost:5000/api/v1/auth/userdata';

getdata =  (url) => {

    fetch(profileUrl, {
      method: 'GET',
      headers: {"Authorization":localStorage.getItem('token') }
    })
      .then(response => response.json())
      .then(data => {
        // Call function to map items to a html element
        console.log('REs-data:', data);
        mapProfile(data);
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  }

  mapProfile =  (data) => {

      const element = `<div class="card stats">
      <h1>${data.username}</h1>
      <p>${data.email}</p>
      <h1>Statistics</h1>
              <p class="title">No of Questions asked: ${data.questions.length}</p>
              <p class="title">No of questions answered: 9</p>
      </div>`
      
      $('profile-data').append(element);

   }

   window.onload = () => {
    getdata(profileUrl);
  }