const apiUrl = 'http://localhost:5000/api/v1';
const questionsurl = `${apiUrl}/questions`;
const myquestionsurl = `${apiUrl}/user_questions`;


const questions = {

    getAll: (url) => {
              fetch(questionsurl, {
                  method: 'GET',
                  headers: {"Authorization":localStorage.getItem('token') }
                    })
              .then(response => response.json())
              .then(data => {
                  if(data.message == 'Account logged out. Please log in to continue'){
                    window.location.href = "index.html";
                  }
                  else if(data.message == 'Your token has expired. Please log in to continue' ){
                    window.location.href = "index.html";
                  }
                    // Call function to map items to a html element
                  console.log('REs-data:', data);
                    
                  mapelements.mapAllQuestions(data.questions);
                    })
              .catch(err => {
                console.log(`Fetch Error: ${err}`);
                  });
            },

    myQuestions: (url) => {
                  let user_id = localStorage.getItem('user_id')
                  fetch(`${apiUrl}/user_questions/${user_id}`, {
                    method: 'GET',
                    headers: {"Authorization": localStorage.getItem('token') }
                      })

                  .then(response => response.json())
                  .then(data => {
                    if(data.message == 'Account logged out. Please log in to continue'){
                      window.location.href = "index.html";
                    }
                    else if(data.message == 'Your token has expired. Please log in to continue' ){
                      window.location.href = "index.html";
                    }
                    else if(data.message == "There are no questions to view"){
                      $('.myquestions-container').html(data.message)
                    }
                    else{
                      mapelements.mapMyQuestions(data.questions);
                    }
                    })
                  .catch(err => {
                    console.log(`Fetch Error: ${err}`);
                    });
                },

    createQuestion: $(document).on('click', '.postquestion', 
                    function async(event){
                    event.preventDefault();
                    let description = document.getElementById('description').value;
                    fetch(questionsurl, {
                        method:'POST',
                        headers:{"Authorization":localStorage.getItem('token'),
                                  "Content-type":"application/json" ,
                                  "Accept":"application/json"},
                        body: JSON.stringify({
                          "description":description
                      })
                    })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('message').innerHTML = data.message;
                        $('.message.questions').fadeIn('slow');
                        $('.message.questions').fadeOut(3000);
      
                      })
                    .catch(err => {
                        console.log(`Fetch Error: ${err}`);
                      });
                      })
};


window.onload = () => {questions.getAll(questionsurl);
  questions.myQuestions(myquestionsurl);
  profile.getmydata(profileUrl); 
  postedbyprofile.profileQuestions(myquestionsurl);
}

const answers = { 

    questionanswers: $(document).on('click', '.card.questions', 
                      function getquestionAnswers (url){
                      $('.answers-container').empty();

                      let id = $(this).attr('id')
                      $('.answer-button').attr('id',id);
                        
                      fetch(`${apiUrl}/question_answers/${id}`, {
                          method: 'GET',
                          headers: {"Authorization": localStorage.getItem('token')}
                          })
                      .then((response) => response.json())
                      .then(data => {
                        if(data.message == 'Your token has expired. Please log in to continue' ){
                          window.location.href = "index.html";
                        }
                          console.log(data);
                          mapelements.mapAnswers(data.answers);
                          })
                      .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                          });
                      }),

    answerquestion: $(document).on('click', '.answer-button', 
                      function async(event) {
                      event.preventDefault();
                      let id = $(this).attr('id')
                      let answer = document.getElementById('answer').value;

                      fetch(`${apiUrl}/questions/${id}/answers`, {
                          method:'POST',
                          headers:{"Authorization":localStorage.getItem('token'),
                                      "Content-type":"application/json" ,
                                      "Accept":"application/json"},
                          body: JSON.stringify({
                              "answer":answer
                            })
                        })
                      .then((response) => response.json())
                      .then(data => {
                          if(data.message == 'Your token has expired. Please log in to continue' ){
                            window.location.href = "index.html";
                          }
                          console.log(data);
                          $('.message.answers').html(data.message);
                          $('.message.answers').fadeIn('slow');
                          $('.message.answers').fadeOut(3000);
          
                          })
                      .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                          });
                      }),

};

const Delete= {
  
    questionpopup: $(document).on('click', '.button.delete.question', 

                    function showpopup(){
                    let id = $(this).attr('id')
                    $('.delete-button').attr('id',id);

                    $(".cover").fadeIn('slow');
                    $(".popup").fadeIn('slow');
                    }  
                    ),

    deletequestion: $(document).on('click', '.delete-button',
                    function deleteQuestion(url){
                    let id = $(this).attr('id')

                    fetch(`${apiUrl}/questions/${id}`, {
                        method: 'DELETE',
                        headers: {"Authorization":localStorage.getItem('token') }
                    })
                    .then((response) => response.json())
                    .then(data => {
                        if(data.message == 'Your token has expired. Please log in to continue' ){
                          window.location.href = "index.html";
                        }
                        else if(data.message == "Deleted successfully"){
                            document.getElementById('delete-message').innerHTML=data.message;
                            window.location.href = "myaccount.html";
                              }
                        console.log(data.message);
                        })
                    .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                      });
                      }),

    answerpopup: $(document).on('click', '.button.delete.answer', 

                  function showpopup(url){
                  let id = $(this).attr('id')
                  let name = $(this).attr('name')
      
                  $('.delete-button').attr('id',id);
                  $('.delete-button').attr('name',name);
                      
                  $(".cover").fadeIn('slow');
                  $(".popup").fadeIn('slow');
                  }  
                  ), 

    deleteanswer: $(document).on('click', '.delete-button', 
                    function deleteAnswer (url){
      
                    let question_id = $(this).attr('name')
                    let answer_id = $(this).attr('id')
      
                    fetch(`${apiUrl}/questions/${question_id}/answers/${answer_id}`, {
                        method: 'DELETE',
                        headers: {"Authorization":localStorage.getItem('token') }
                        })
                    .then((response) => response.json())
                    .then(data => {
                        if(data.message == 'Your token has expired. Please log in to continue' ){
                          window.location.href = "index.html";
                        }
                        else if(data.message == "successfully deleted the answer"){
                            window.location.reload();
                            }
                            
                          })
                    .catch(err => {
                        console.log(`Fetch Error: ${err}`);
                        });
                    })
  };


const edit = {

    editquestionpopup: $(document).on('click', '.button.edit.question', 

                        function showpopup(url){
                        let id = $(this).attr('id')
                        let description = $(this).attr('description')

                        $('.edit-button').attr('id',id);
                        $('.description').html(description);
                            
                        $(".cover").fadeIn('slow');
                        $(".container.edit").fadeIn('slow');
                        }  
                        ),
    
    editquestion: $(document).on('click', '.edit-button', 
                  function editQuestion(url){
                  
                  let id = $(this).attr('id')
                  let description = document.getElementById('description').value;

                  fetch(`${apiUrl}/questions/${id}`, {
                      method: 'PUT',
                      headers: {"Authorization":localStorage.getItem('token') },
                      body: JSON.stringify({
                        "description":description})
                      })
                  .then((response) => response.json())
                  .then(data => {
                      if(data.message == "Successfully updated the question"){
                          window.location.reload();
                      }
                      console.log(data.message);
                      })
                  .catch(err => {
                      console.log(`Fetch Error: ${err}`);
                      });
                  }),

    editanswerpopup: $(document).on('click', '.button.edit.answer', 
                      function showpopup(url){
                      let id = $(this).attr('id')
                      let name = $(this).attr('name')
                      let description = $(this).attr('description')
          
                      $('.edit-button').attr('id',id);
                      $('.edit-button').attr('name', name);
                      $('.description').html(description);
                          
                      $(".cover").fadeIn('slow');
                      $(".container.edit").fadeIn('slow');
                      }  
                      ),
    
    editanswer: $(document).on('click', '.edit-button', 
                function editAnswer(url){
                let question_id = $(this).attr('name')
                let answer_id = $(this).attr('id')
                  
                let answer = document.getElementById('description').value;

                fetch(`${apiUrl}/questions/${question_id}/answers/${answer_id}`, {
                      method: 'PUT',
                      headers: {"Authorization":localStorage.getItem('token') },
                      body: JSON.stringify({
                        "answer":answer})
                      })
                .then((response) => response.json())
                .then(data => {
                      console.log(data.message);
                      window.location.reload();
                      })
                .catch(err => {
                      console.log(`Fetch Error: ${err}`);
                      });
                  })
  };


const answerFunctions = {

    vote: $(document).on('click', '.vote', 
            function upvoteAnswer(url){
            let answer_id = $(this).attr('id')
            let vote = $(this).attr('vote')

            fetch(`${apiUrl}/answers/${answer_id}/vote`, {
                method: 'POST',
                headers: {"Authorization":localStorage.getItem('token') },
                body: JSON.stringify({
                      "vote":vote})
                    })
            .then((response) => response.json())
            .then(data => {
                console.log(data.message);
                $('.message.answers').html(data.message);
                $('.message.answers').fadeIn('slow');
                $('.message.answers').fadeOut(3000);
                  })
            .catch(err => {
                console.log(`Fetch Error: ${err}`);
                });
                }),

    accept: $(document).on('click', '.accept', 
              function acceptAnswer(url){
              let answer_id = $(this).attr('id')
              let question_id= $(this).attr('name')
              let accept= $(this).attr('status') 

              fetch(`${apiUrl}/questions/${question_id}/answers/${answer_id}/accept`, {
                  method: 'POST',
                  headers: {"Authorization":localStorage.getItem('token')},
                  body: JSON.stringify({
                        "status":accept})
                    })
              .then((response) => response.json())
              .then(data => {
                  console.log(data.message);
                  $(this).html('Accepted');
                  $('.message.answers').html(data.message);
                  $('.message.answers').fadeIn('slow');
                  $('.message.answers').fadeOut(3000);
                    })
              .catch(err => {
                  console.log(`Fetch Error: ${err}`);
                    });
                })
};


const postedbyprofile = {

  click: $(document).on('click','.posted',function(){
            let profile_id = $(this).attr('user_id')
            localStorage.setItem('profile_id', profile_id)
            window.location.href  = "profile.html";
            }),

  
  profileQuestions: (url) => {
              let user_id = localStorage.getItem('profile_id')
              fetch(`${apiUrl}/user_questions/${user_id}`, {
                method: 'GET',
                headers: {"Authorization": localStorage.getItem('token') }
                  })

              .then(response => response.json())
              .then(data => {
                if(data.message == 'Account logged out. Please log in to continue'){
                  window.location.href = "index.html";
                }
                else if(data.message == 'Your token has expired. Please log in to continue' ){
                  window.location.href = "index.html";
                }
                else if(data.message == "There are no questions to view"){
                  $('.myquestions-container-other').html(data.message)
                }
                else{
                  mapelements.mapProfileQuestions(data.questions);
                }
                })
              .catch(err => {
                console.log(`Fetch Error: ${err}`);
                });
            }

};


const mapelements = {

    mapAllQuestions: (data) => {
                    data.forEach(question => {
                      const element = `

                      <div class="card questions" id=${question.question_id}>
                            <p> ${question.question_description}? </p>
                                <h6>
                                <p>Posted by:<a class="posted" user_id=${question.user_id} style=color:blue;>${question.posted_by}</a> on: ${question.created_at}</p>
                                    <a>Answers: ${question.answers.length}</a>
                                </h6>
                      </div>
                    `;
                      $('.questions-container').append(element);
                    });
                  },

    mapAnswers: (data) => {
                data.forEach(answer => {
                  let user_id = localStorage.getItem('user_id')
              
                  if((answer.question_owner == user_id) && (user_id == answer.user_id)){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                          <p>Posted by:<a class="posted" user_id=${answer.user_id} style=color:blue;>${answer.posted_by}</a> on ${answer.created_at}</p>
                          </h6>
                          <button class="button delete answer" id="${answer.answer_id}" name="${answer.question_id}">Delete</button>
                          <button class="button edit answer" id="${answer.answer_id}" name="${answer.question_id}" description="${answer.answer_description}">Edit</button>
                          <button class="button accept answer" id="${answer.answer_id}" name="${answer.question_id}" status="accepted">${answer.accepted}</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);
                  }
                else if ((answer.question_owner == user_id) && (user_id != answer.user_id)){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                          <p>Posted by:<a class="posted" user_id=${answer.user_id} style=color:blue;>${answer.posted_by}</a> on: ${answer.created_at}</p>
                          </h6>
                          <button class="button accept answer" status="accepted" id="${answer.answer_id}" name="${answer.question_id}">${answer.accepted}</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);

                }
                else if (user_id == answer.user_id){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                          <p>Posted by:<a class="posted" style=color:blue;>${answer.posted_by}</a> on: ${answer.created_at}</p>
                          </h6>
                          <button class="button delete answer" id="${answer.answer_id}" name="${answer.question_id}">Delete</button>
                          <button class="button edit answer" id="${answer.answer_id}" name="${answer.question_id}" description="${answer.answer_description}">Edit</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);

                }
                else {
                  const element = `

                  <div class="card answer" id=${answer.answer_id}>
                      <div>
                        <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote">
                        <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                        <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                      </div>

                      <div>
                            <p> 
                                ${answer.answer_description}
                            </p>
                            <h6>
                                <p>Posted by:<a class="posted" user_id=${answer.user_id} style=color:blue;>${answer.posted_by}</a> on: ${answer.created_at}</p>
                            </h6> 
                      </div>
                  </div>`;

                  $('.answers-container').append(element);
                } 

                });
              },

  mapMyQuestions: (data) => {
                  data.forEach(question => {
                    const element = `
                    <div class="card questions" id=${question.question_id}>
                        <p> ${question.question_description}? </p>
                          <h6>                         
                              <p>Posted by: YOU on: ${question.created_at}</p>
                              <a>Answers: ${question.answers.length}</a><br>
                              <button class="button delete question" id="${question.question_id}">Delete</button>
                              <button class="button edit question" id="${question.question_id}" description="${question.question_description}" >Edit</button>
                          </h6>
                    </div>
                  `;
                    $('.myquestions-container').append(element);
                  });
                },

  mapProfileQuestions: (data) => {
                  data.forEach(question => {
                    const element = `
                    <div class="card questions" id=${question.question_id}>
                        <p> ${question.question_description}? </p>
                          <h6>                         
                              <p>Posted by: YOU on: ${question.created_at}</p>
                              <a>Answers: ${question.answers.length}</a><br>
                          </h6>
                    </div>
                  `;
                    $('.myquestions-container-other').append(element);
                  });
                }
  
};
  





                








