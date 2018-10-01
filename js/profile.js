const profileUrl='http://localhost:5000/api/v1/auth/userdata';

const profile = {

  getmydata: (url) => {

    let user_id = localStorage.getItem('user_id')
    fetch(`${profileUrl}/${user_id}`, {
      method: 'GET',
      headers: {"Authorization":localStorage.getItem('token') }
      })
    .then(response => response.json())
    .then(data => {
      console.log('REs-data:', data);
      mapmyProfile(data);
      })
    .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
     },

    getdata: (url) => {
      let user_id  = localStorage.getItem('profile_id')
      fetch(`${profileUrl}/${user_id}`, {
        method: 'GET',
        headers: {"Authorization":localStorage.getItem('token') }
        })
      .then(response => response.json())
      .then(data => {
        console.log('REs-data:', data);
        mapdata(data);
        })
      .catch(err => {
          console.log(`Fetch Error: ${err}`);
        });
    }
};

window.onload = () => {
  profile.getdata(profileUrl);
}


mapmyProfile = (data) => {

            const element = `<div class="card stats">
                                <h1>${data.data.username}</h1>
                                <p>${data.data.email}</p>
                                <h1>Statistics</h1>
                                <p class="title">No of Questions asked:${data.data.questions.length} </p>
                                <p class="title">No of Questions answered:${data.data.questions_answered}</p>
                                <p class="title">No of answers given:${data.data.answers} </p>
                            </div>`;
            
            $('.profile-info').html(element);

   };


mapdata = (data) => {

  const element = `<div class="card stats">
                      <h1>${data.data.username}</h1>
                      <p>${data.data.email}</p>
                      <h1>Statistics</h1>
                      <p class="title">No of Questions asked:${data.data.questions.length} </p>
                      <p class="title">No of Questions answered:${data.data.questions_answered}</p>
                      <p class="title">No of answers given:${data.data.answers} </p>
                  </div>`;
  
  $('.profile-info-other').html(element);

};

